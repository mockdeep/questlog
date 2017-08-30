class Task < ApplicationRecord

  class BulkCreate

    include JunkDrawer::Callable

    def call(user:, titles:)
      user.tasks.create(task_params(titles))
    end

  private

    def task_params(titles)
      titles.split("\n").map { |title| title_parser.(title) }
    end

    def title_parser
      @title_parser ||= TitleParser.new
    end

  end

end
