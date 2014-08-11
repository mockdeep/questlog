require 'spec_helper'

describe Task, '.next' do

  it 'returns the next task, sorted by priority first' do
    task1 = create(:task)
    task2 = create(:task)
    task3 = create(:task, priority: 1)
    task4 = create(:task, priority: 2)
    expect(Task.next).to eq task3
    task3.update_attributes(done: true)
    expect(Task.next).to eq task4
    task4.update_attributes(done: true)
    expect(Task.next).to eq task1
    task1.update_attributes(done: true)
    expect(Task.next).to eq task2
    task2.update_attributes(done: true)
    expect(Task.next).to be_nil
  end

end
