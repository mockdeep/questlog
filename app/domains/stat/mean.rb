class Stat

  class Mean

    include JunkDrawer::Callable

    def call(values)
      return if values.empty?

      values.sum / values.length
    end

  end

end
