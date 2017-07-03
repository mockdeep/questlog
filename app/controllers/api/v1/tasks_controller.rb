module API

  module V1

    class TasksController < ApplicationController

      def index
        tasks = current_user.undone_and_pending_tasks
        render json: serialize(tasks, included: tags)
      end

    private

      def tags
        current_user.ordered_tags.to_a.tap do |tags|
          tags.unshift(estimate_tag) if current_user.tasks.without_estimate.any?
          tags.unshift(untagged_tag) if current_user.untagged_tasks.any?
          tags.unshift(all_tag)
        end
      end

      def estimate_tag
        Tag.new(
          id: -2,
          name: 'Needs Estimate',
          unfinished_tasks_count: current_user.tasks.without_estimate.count,
          slug: 'needs-estimate',
          tasks: current_user.tasks.without_estimate,
        )
      end

      def untagged_tag
        Tag.new(
          id: -1,
          name: 'Untagged',
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

    end

  end

end
