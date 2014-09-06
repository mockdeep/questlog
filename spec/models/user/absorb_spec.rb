require 'spec_helper'

describe User, '#absorb' do

  let(:user) { create(:user) }
  let(:task) { create(:task, user: user) }

  it 'takes the tasks from the other user' do
    other_user = create(:user)
    other_task = create(:task, user: other_user)
    user.absorb(other_user)
    expect(other_task.reload.user).to eq user
  end

  it 'updates the tasks counter' do
    task.update_attributes(done: true)
    other_user = create(:user)
    create(:task, user: other_user)
    expect do
      user.absorb(other_user)
    end.to change { user.reload.unfinished_tasks_count }.from(0).to(1)
  end

  it 'deletes the other user' do
    other_user = create(:user)
    user.absorb(other_user)
    expect(User.find_by_id(other_user.id)).to be_nil
  end

  it 'merges contexts' do
    other_user = create(:user)
    create(:context, name: 'solo', user: other_user)
    other_context2 = create(:context, name: 'duplicate', user: other_user)
    other_task = create(
      :task,
      title: 'bloo',
      user: other_user,
      contexts: [other_context2],
    )
    create(:context, name: 'another-solo', user: user)
    context2 = create(:context, name: 'duplicate', user: user)
    expected_names = %w(another-solo duplicate solo)
    user.absorb(other_user)
    expect(user.reload.contexts.pluck(:name).sort).to eq expected_names
    expect(other_task.reload.contexts).to eq [context2]
  end

end
