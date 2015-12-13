RSpec.describe BulkTask, '#create' do

  let(:user) { create(:free_user) }

  it 'creates tasks from the given title string, split on newline' do
    expect do
      BulkTask.create(titles: "*1d eat\n@10pm brush teeth\n#me moo", user: user)
    end.to change(Task, :count).by(3)
    expect(Task.undone.pluck(:title).sort).to eq %w(eat moo)
  end

  it 'does not create blank tasks' do
    expect do
      BulkTask.create(titles: "one\n \nanother", user: user)
    end.to change(Task, :count).by(2)
  end

  it 'does not create tasks without a user' do
    expect do
      BulkTask.create(titles: "who\ncares")
    end.to raise_error(ArgumentError)
  end

end
