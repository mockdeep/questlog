require 'spec_helper'

describe TaskForm do

  let(:user) { User.new }
  let(:task_form) { TaskForm.new(user) }
  let(:task) { task_form.task }

  describe '#submit' do
    context 'when given a title' do
      it 'handles # strings' do
        task_form.submit(title: '#work eat something #home')
        expect(task.title).to eq 'eat something'
        expect(task.contexts.map(&:name)).to eq %w(work home)
      end

      it 'handles # strings with various quotes' do
        task_form.submit(title: %{#"at work" eat "something" #'at home'})
        expect(task.title).to eq 'eat "something"'
        expect(task.contexts.map(&:name)).to eq ['at work', 'at home']
      end

      # it 'updates counters' do
      #   expect(user.tasks_count).to eq 0
      #   task_form.submit(title: %{#"at work" eat "something" #'at home'})
      #   task.reload
      #   task.contexts.each do |context|
      #     expect(context.tasks_count).to eq 1
      #   end
      #   expect(user.reload.tasks_count).to eq 1
      # end
    end

    context 'if repeat string is blank' do
      it 'sets it to nil' do
        task_form.submit(title: 'bloo blah', repeat_string: '')
        expect(task.repeat_string).to be_nil
      end
    end
  end

end
