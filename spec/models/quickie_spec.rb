require 'spec_helper'

describe Quickie do

  describe '#valid?' do
    it { should validate_presence_of(:title) }
  end

end
