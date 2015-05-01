class Median

  def self.new(values, default:)
    return default unless values.any?
    sorted = values.sort
    len = sorted.length
    (sorted[(len - 1) / 2] + sorted[len / 2]) / 2
  end

end
