require 'spec_helper'

describe Task, 'validations' do

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:user) }
  it { should validate_numericality_of(:time_estimate) }
  it { should allow_value(1).for(:priority) }
  it { should allow_value(2).for(:priority) }
  it { should allow_value(3).for(:priority) }
  it { should allow_value(nil).for(:priority) }
  it { should_not allow_value(0).for(:priority) }
  it { should_not allow_value(4).for(:priority) }

end
