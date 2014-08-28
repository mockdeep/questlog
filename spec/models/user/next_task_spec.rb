require 'spec_helper'

describe User, '#next_task' do

  let(:context) { create(:context, user: user) }
  let(:task1) { create(:task, user: user) }
  let(:task2) { create(:task, user: user) }
  let(:user) { create(:user) }

  context 'given a context_id parameter' do
    it 'returns the next task for that context' do
      task1
      task2.contexts << context
      expect(user.next_task).to eq task1
      expect(user.next_task(context.id)).to eq task2
    end
  end

  it 'returns the next undone task' do
    task1
    task2
    expect(user.next_task).to eq task1
    task1.update_attributes(done: true)
    expect(user.next_task).to eq task2
    task2.update_attributes(done: true)
    expect(user.reload.next_task).to be_nil
  end
end
