RSpec.describe Task, '#repeat_string=' do

  let(:task) { Task.new }

  it 'sets it to nil when the string is blank' do
    task.repeat_string = ''
    expect(task.repeat_string).to be_nil
  end

  it 'sets it to the given string when the repeat string is not empty' do
    task.repeat_string = 'foo'
    expect(task.repeat_string).to eq 'foo'
  end

end
