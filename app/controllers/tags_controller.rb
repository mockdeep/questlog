# frozen_string_literal: true

class TagsController < ApplicationController
  def index
    render(locals: { tags: current_user.tags.order(:name) })
  end

  def show; end

  def edit
    @tag = current_user.tags.friendly.find(params.expect(:id))
  end

  def update
    tag = current_user.tags.find(params.expect(:id))
    Tag::Update.(tag, tag_params)
    redirect_to "/tags"
  end

  private

  def tag_params
    params
      .expect(tag: [{ rules: [[:check, :field]] }])
      .to_h
      .merge(user: current_user)
      .symbolize_keys
  end
end
