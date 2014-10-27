require 'spec_helper'

describe Tag, '#next_task' do

  let(:user) { create(:user) }
  let(:tag) { create(:tag, user: user) }

  it 'returns the next task' do
    task1 = create(:task)
    task2 = create(:task)
    tag.tasks << task1
    tag.tasks << task2
    expect(tag.next_task).to eq task1
    task1.update_attributes!(done: true)
    expect(tag.next_task).to eq task2
  end

end
