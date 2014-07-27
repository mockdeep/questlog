require 'spec_helper'

describe BulkTask, '#persisted?' do

  it 'returns false' do
    expect(BulkTask.new.persisted?).to be false
  end

end
