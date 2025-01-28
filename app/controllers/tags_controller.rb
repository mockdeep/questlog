class TagsController < ApplicationController
  def index
    render(locals: { tags: current_user.tags.order(:name) })
  end

  def show; end

  def edit; end

  def update
    tag = current_user.tags.find(params[:id])
    Tag::Update.(tag, tag_params)
    redirect_to '/tags'
  end

  private

  def tag_params
    params
      .expect(tag: [rules: [[:check, :field]]])
      .to_h
      .merge(user: current_user)
      .symbolize_keys
  end
end
