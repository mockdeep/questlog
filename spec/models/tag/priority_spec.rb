RSpec.describe Tag, '#priority' do

  let(:tag) { create(:tag) }

  it 'returns the highest task priority' do
    tag.tasks << create(:task)
    expect(tag.priority).to be_nil
    tag.tasks << create(:task, priority: 2)
    expect(tag.priority).to be 2
    tag.tasks << create(:task, priority: 1)
    expect(tag.priority).to be 1
  end

end
