class Timeframe
  NAMES = [
    'today',
    'week',
    'month',
    'quarter',
    'year',
    'lustrum',
    'decade',
    'century',
  ].freeze

  attr_reader :tasks, :name

  def self.for(user:)
    all_tasks = user.unfinished_tasks.includes(:tags).group_by(&:timeframe)
    inbox_tasks = all_tasks[nil] || []
    timeframes = [Timeframe.new(tasks: inbox_tasks, name: 'inbox')]
    NAMES.each do |name|
      tasks = all_tasks[name] || []
      timeframes << Timeframe.new(name:, tasks:)
    end
    timeframes
  end

  def initialize(tasks:, name:)
    @name = name
    @tasks = tasks
  end

  def ==(other)
    name == other.name && tasks == other.tasks
  end
end
