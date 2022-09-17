class Stat < ApplicationRecord
  class Create
    include JunkDrawer::Callable

    def call(value:, user:, name:)
      find_params = { name:, user:, timestamp: today }
      stat = Stat.find_or_initialize_by(find_params)
      stat.value ||= 0
      stat.value += StatValue.new(value:, user:)
      stat.save!
    end

    private

    def today
      Time.zone.now.beginning_of_day
    end
  end
end
