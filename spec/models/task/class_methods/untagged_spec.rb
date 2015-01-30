RSpec.describe Task, '#untagged' do

  it 'returns only tasks without tags' do
    task_1 = create(:task)
    task_2 = create(:task)

    task_1.tags << create(:tag)

    expect(Task.untagged).to eq [task_2]
  end

end
