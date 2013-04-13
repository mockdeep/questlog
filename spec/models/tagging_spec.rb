require 'spec_helper'

describe Tagging do

  describe 'associations' do
    it { should belong_to(:quickie) }
    it { should belong_to(:tag) }
  end

  describe '#valid?' do
    it { should validate_presence_of(:quickie) }
    it { should validate_presence_of(:tag) }
  end

end
