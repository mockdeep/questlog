module API

  module V1

    class TasksController < ApplicationController
      def index
        tasks = current_user.undone_and_pending_tasks
        render json: serialize(tasks, included: tags)
      end

      def update
        task = current_user.tasks.find(params[:id])
        Task::Update.(task, task_params)
        render json: serialize(task, included: task.tags), status: :ok
      end

      def destroy
        task = current_user.tasks.find(params[:id])
        Task::Destroy.(task)
        render json: {}, status: :ok
      end

      private

      def tags
        current_user.ordered_tags.to_a.tap do |tags|
          tags.unshift(estimate_tag)
          tags.unshift(untagged_tag)
          tags.unshift(all_tag)
        end
      end

      def estimate_tag
        Tag.new(
          id: -2,
          name: 'Needs Estimate',
          rules: [{ check: 'isBlank', field: 'estimateSeconds' }],
          unfinished_tasks_count: current_user.tasks.without_estimate.count,
          slug: 'needs-estimate',
          tasks: current_user.tasks.without_estimate,
        )
      end

      def untagged_tag
        Tag.new(
          id: -1,
          name: 'Untagged',
          rules: [{ check: 'isEmpty', field: 'tagIds' }],
          unfinished_tasks_count: current_user.untagged_tasks.count,
          slug: 'untagged',
          tasks: current_user.untagged_tasks,
        )
      end

      def all_tag
        Tag.new(
          id: 0,
          name: 'All',
          rules: [{ check: 'isActive' }],
          unfinished_tasks_count: current_user.unfinished_tasks_count,
          slug: '',
          tasks: current_user.unfinished_tasks,
        )
      end

      def task_params
        params
          .expect(task: [*permitted_params, { tag_names: [] }])
          .to_h
          .symbolize_keys
          .merge(parsed_title)
      end

      def permitted_params
        [
          :done,
          :parent_task_id,
          :postpone,
          :priority,
          :release_at,
          :repeat_seconds,
          :timeframe,
          :title,
        ]
      end

      def parsed_title
        TitleParser.(params[:task][:title])
      end
    end

  end

end
