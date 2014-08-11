require 'spec_helper'

describe Task, 'validations' do

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:user) }
  it { should validate_numericality_of(:time_estimate) }
  it { should validate_numericality_of(:priority) }

end
