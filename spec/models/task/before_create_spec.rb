RSpec.describe Task, 'before_create' do

  let(:user) { create(:user) }

  before(:each) do
    create(:task, user: user)
    create(:task, user: user, position: 12)
    create(:task, user: user, position: 3)
    create(:task, done_at: 1.month.ago, user: user, position: 18)
    create(:task, position: 17)
  end

  it 'assigns a position' do
    expect(create(:task, user: user).position).to eq 13
  end

end
