class Stat

  class Median

    include JunkDrawer::Callable

    def call(values)
      return if values.empty?

      sorted = values.sort
      length = sorted.length
      (sorted[(length - 1) / 2] + sorted[length / 2]) / 2
    end

  end

end
