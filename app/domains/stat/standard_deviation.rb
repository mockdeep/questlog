class Stat

  class StandardDeviation

    include JunkDrawer::Callable

    def call(values)
      return if values.empty?
      return 0 if values.length == 1

      Math.sqrt(sample_variance(values))
    end

  private

    def sample_variance(values)
      mean = Mean.(values.map(&:to_f))
      deviation_sum = values.reduce(0) do |acc, value|
        acc + (value - mean)**2
      end

      deviation_sum / (values.length - 1).to_f
    end

  end

end
