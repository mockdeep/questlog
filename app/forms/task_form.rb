class TaskForm
  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attr_accessor :user

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

  def task
    @task ||= user.tasks.new
  end

  def persisted?
    false
  end

  def initialize(user)
    self.user = user
  end

  def submit(params)
    params[:repeat_string] = nil if params[:repeat_string].blank?
    title = params[:title]
    if title
      title, context_names = TagParser.new.parse(title)

      contexts = context_names.map do |context_name|
        user.contexts.find_or_create_by_name(context_name)
      end

      params[:title] = title
      params[:contexts] = contexts
      removed_contexts = task.contexts - contexts
      new_contexts = contexts - task.contexts
    end

    task.attributes = params
    if task.save
      if title
        removed_contexts.each { |context| context.decrement!(:tasks_count) }
        new_contexts.each { |context| context.increment!(:tasks_count) }
      end
      true
    else
      false
    end
  end

end
