require 'spec_helper'

describe Tag, '#any?' do
  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }

  it 'returns true when there are tasks' do
    tag.tasks << create(:task)
    expect(tag.reload.any?).to be true
  end

  it 'returns false when there are no tasks' do
    expect(tag.any?).to be false
  end

end
