require 'spec_helper'

describe Context, 'validations' do

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:user) }

  it { should validate_uniqueness_of(:name).scoped_to(:user_id) }

end
