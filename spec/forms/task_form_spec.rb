require 'spec_helper'

describe TaskForm do

  let(:user) { User.new }
  let(:task_form) { TaskForm.new(user) }
  let(:task) { task_form.task }

  describe '#submit' do
    context 'when given a title' do
      it 'handles # strings' do
        task_form.submit(title: '#at-work eat something #at.home')
        expect(task.title).to eq 'eat something'
        expect(task.contexts.map(&:name)).to eq %w(at-work at.home)
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

    context 'when given an existing task with contexts' do
      let(:user) { create(:user) }
      let(:task) { create(:task, contexts: [home_context], user: user) }
      let(:home_context) { create(:context, name: 'home', user: user) }
      let(:work_context) { create(:context, name: 'work', user: user) }
      let(:task_form) { TaskForm.new(user, task) }

      before(:each) do
        work_context
        task_form.submit(title: 'do some work #work')
      end

      it 'changes the contexts associated with the task' do
        expect(task.reload.contexts).to eq [work_context]
      end

      it 'decrements removed contexts' do
        expect(home_context.reload.tasks_count).to eq 0
      end

      it 'increments added contexts' do
        expect(work_context.reload.tasks_count).to eq 1
      end
    end

    context 'if repeat string is blank' do
      it 'sets it to nil' do
        task_form.submit(title: 'bloo blah', repeat_string: '')
        expect(task.repeat_string).to be_nil
      end
    end
  end

end
