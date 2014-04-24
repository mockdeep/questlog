require 'spec_helper'

describe Tagging do

  describe 'associations' do
    it { should belong_to(:task) }
    it { should belong_to(:context) }
  end

  describe 'validations' do
    it { should validate_presence_of(:task) }
    it { should validate_presence_of(:context) }
  end

end
