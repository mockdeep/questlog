require 'spec_helper'

describe Context, '#any?' do
  let(:user) { create(:user) }
  let(:context) { create(:context, user: user) }

  it 'returns true when there are tasks' do
    context.tasks << create(:task)
    expect(context.reload.any?).to be true
  end

  it 'returns false when there are no tasks' do
    expect(context.any?).to be false
  end

end
