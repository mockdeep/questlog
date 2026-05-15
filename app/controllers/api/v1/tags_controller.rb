# frozen_string_literal: true

module API

  module V1

    class TagsController < ApplicationController
      def create
        tag = Tag::Create.(**tag_params)
        render json: serialize(tag), status: :created
      end

      def update
        tag = current_user.tags.find(params.expect(:id))
        Tag::Update.(tag, tag_params)
        render json: serialize(tag), status: :ok
      end

      private

      def tag_params
        params
          .expect(tag: [:name, { rules: [[:check, :field]] }])
          .to_h
          .merge(user: current_user)
          .symbolize_keys
      end
    end

  end

end
