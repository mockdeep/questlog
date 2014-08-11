class BulkTask

  # extend ActiveModel::Naming
  include ActiveModel::Conversion

  attr_reader :id, :titles

  def self.model_name
    ActiveModel::Name.new(self, nil, 'BulkTask')
  end

  def persisted?
    false
  end

  def self.create(params)
    user = params.fetch(:user)
    titles = params.fetch(:titles)

    user.tasks.create(task_params(titles))
  end

  def self.task_params(titles)
    titles.split("\n").map { |title| title_parser.parse(title) }
  end
  private_class_method :task_params

  def self.title_parser
    @title_parser ||= TitleParser.new
  end
  private_class_method :title_parser

end
