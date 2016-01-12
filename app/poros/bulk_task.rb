class BulkTask

  extend ActiveModel::Naming
  include ActiveModel::Conversion

  attr_reader :id, :titles

  def self.model_name
    ActiveModel::Name.new(self, nil, 'BulkTask')
  end

  def persisted?
    false
  end

  def self.update(user:, positions:)
    user.tasks.reposition(positions.map(&:to_i))
  end

end
