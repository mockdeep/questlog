class Timeframe

  include ActiveModel::Serialization

  attr_reader :tasks, :name

  def initialize(tasks:, name:)
    @name = name
    @tasks = tasks
  end

  def self.for(user:)
    timeframes = []
    inbox_tasks = user.unfinished_tasks.where(timeframe: nil).includes(:tags)
    if inbox_tasks.any?
      timeframes << Timeframe.new(tasks: inbox_tasks, name: 'Inbox')
    end
    timeframes
  end

end
