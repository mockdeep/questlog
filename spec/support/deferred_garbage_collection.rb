class DeferredGarbageCollection

  DEFERRED_GC_THRESHOLD = (ENV['DEFER_GC'] || 15.0).to_f

  @last_gc_run = Time.now

  def self.start
    GC.disable if DEFERRED_GC_THRESHOLD > 0
  end

  def self.reconsider
    if time_to_gc?
      GC.enable
      GC.start
      GC.disable
      @last_gc_run = Time.now
    end
  end

  def self.time_to_gc?
    threshold? && threshold_passed?
  end

  def self.threshold?
    DEFERRED_GC_THRESHOLD > 0
  end

  def self.threshold_passed?
    Time.now - @last_gc_run >= DEFERRED_GC_THRESHOLD
  end

end
