class TaskForm
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attr_accessor :user, :task

  delegate(
    :errors,
    :title,
    :repeat_string,
    :time_estimate,
    :priority,
    to: :task,
  )

  def self.model_name
    ActiveModel::Name.new(self, nil, 'Task')
  end

  def persisted?
    false
  end

  def initialize(user, task = nil)
    self.user = user
    self.task = task || user.tasks.new
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
    end

    task.update_attributes(params)
  end

end
