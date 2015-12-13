RSpec.describe ApplicationController, '#check_repeats' do

  let(:user) { create(:user) }

  controller do
    def index
      render nothing: true
    end
  end

  before(:each) do
    login_as(user)
  end

  it 'marks tasks as not done if they are ready to release' do
    task1 = create(:task, user: user)

    task2 = create(:task, user: user, done: true, release_at: 1.hour.ago)

    task3 = create(:task, user: user, done: true, release_at: 1.hour.from_now)

    get(:index)

    expect(task1.reload).not_to be_done
    expect(task2.reload).not_to be_done
    expect(task3.reload).to be_done
  end

  it 'updates counters for the associated tags' do
    tag = create(:tag, user: user)
    create(
      :task,
      tags: [tag],
      user: user,
      done: true,
      release_at: 1.week.ago,
    )

    expect do
      get(:index)
    end.to change { tag.reload.unfinished_tasks_count }.from(0).to(1)
  end
end
