class TimeEstimate
  def self.maps
    (5..60).step(5).collect { |num| [ "#{num} minutes", num ] }
  end
end
