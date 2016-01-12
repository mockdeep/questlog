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

end
