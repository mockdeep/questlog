require 'spec_helper'

describe Task, '#contexts=' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }
  let(:context) { create(:context, user: user) }

  it 'updates counters on the contexts' do
    expect do
      task.contexts = [context]
    end.to change { context.reload.unfinished_tasks_count }.by(1)
  end

end
