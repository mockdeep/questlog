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

  def initialize(user, task = nil)
    self.user = user
    @task = task
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
      removed_contexts = task.contexts - contexts
      new_contexts = contexts - task.contexts
    end

    if task.update_attributes(params)
      if title
        removed_contexts.each { |context| context.update_tasks_count! }
        new_contexts.each { |context| context.update_tasks_count! }
      end
      true
    else
      false
    end
  end

end
