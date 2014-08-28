require 'spec_helper'

describe Task, '#repeat?' do

  let(:task) { Task.new }

  it 'returns true when repeat_seconds is present' do
    task.repeat_seconds = 1234
    expect(task.repeat?).to be true
  end

  it 'returns false when repeat_seconds is not present' do
    expect(task.repeat?).to be false
  end

end
