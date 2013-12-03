class QuickieForm
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attr_accessor :user

  delegate :title, :repeat_string, :time_estimate, :priority, to: :quickie

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Quickie')
  end

  def quickie
    @quickie ||= user.quickies.new
  end

  def persisted?
    false
  end

  def initialize(user)
    self.user = user
  end

  def submit(params)
    title = params[:title]
    if title
      title, context_names = TagParser.new.parse(title)

      contexts = context_names.map do |context_name|
        user.contexts.find_or_create_by_name(context_name)
      end

      params[:title] = title
      params[:contexts] = contexts
      removed_contexts = quickie.contexts - contexts
      new_contexts = contexts - quickie.contexts
    end

    quickie.attributes = params
    if quickie.save
      if title
        removed_contexts.each { |context| context.decrement!(:quickies_count) }
        new_contexts.each { |context| context.increment!(:quickies_count) }
      end
      true
    else
      false
    end
  end

end
