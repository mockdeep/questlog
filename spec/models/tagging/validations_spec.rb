require 'spec_helper'

describe Tagging, 'validations' do

  it { is_expected.to validate_presence_of(:task) }
  it { is_expected.to validate_presence_of(:tag) }
  it do
    create(:tagging)
    is_expected.to validate_uniqueness_of(:task_id).scoped_to(:tag_id)
  end

end
