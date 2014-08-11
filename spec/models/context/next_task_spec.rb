require 'spec_helper'

describe Context, '#next_task' do

  let(:user) { create(:user) }
  let(:context) { create(:context, user: user) }

  it 'returns the next task' do
    task1 = create(:task)
    task2 = create(:task)
    context.tasks << task1
    context.tasks << task2
    expect(context.next_task).to eq task1
    task1.update_attributes!(done: true)
    expect(context.next_task).to eq task2
  end

end
