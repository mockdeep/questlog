require 'spec_helper'

describe Tagging, 'validations' do

  it { should validate_presence_of(:task) }
  it { should validate_presence_of(:tag) }
  it do
    create(:tagging)
    should validate_uniqueness_of(:task_id).scoped_to(:context_id)
  end

end
