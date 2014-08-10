require 'spec_helper'

describe TasksHelper, '#task_classes' do

  let(:task) { Task.new }

  context 'when the task has a priority' do
    it 'returns a string with the priority' do
      task.priority = 1
      expect(helper.task_classes(task)).to eq 'priority-1'
    end
  end

  context 'when the task is over skipped' do
    it 'returns the string "over_skipped"' do
      task.skip_count = 5
      expect(helper.task_classes(task)).to eq 'over_skipped'
    end
  end

  context 'when priority and over skipped' do
    it 'returns a string with "over_skipped" and the priority' do
      task.priority = 2
      task.skip_count = 5
      expect(helper.task_classes(task)).to eq 'priority-2 over_skipped'
    end
  end

  context 'when the task has no priority and is not over skipped' do
    it 'returns a blank string' do
      expect(helper.task_classes(task)).to eq ''
    end
  end

end
