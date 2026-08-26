# frozen_string_literal: true

module API

  module V1

    class TasksController < ApplicationController
      PERMITTED_PARAMS = [
        :done,
        :parent_task_id,
        :position,
        :postpone,
        :priority,
        :release_at,
        :repeat_seconds,
        :timeframe,
        :title,
      ].freeze

      def index
        tasks = current_user.undone_and_pending_tasks
        render json: serialize(tasks, included: TagList.for(user: current_user))
      end

      def update
        task = current_user.tasks.find(params.expect(:id))
        Task::Update.(task, task_params)
        render json: serialize(task, included: task.tags), status: :ok
      end

      def destroy
        task = current_user.tasks.find(params.expect(:id))
        Task::Destroy.(task)
        render json: {}, status: :ok
      end

      private

      def task_params
        params
          .expect(task: [*PERMITTED_PARAMS, { tag_names: [] }])
          .to_h
          .symbolize_keys
          .merge(parsed_title)
      end

      def parsed_title
        TitleParser.(params[:task][:title])
      end
    end

  end

end
