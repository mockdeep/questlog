class TagsController < ApplicationController
  def index; end

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
      .require(:tag)
      .permit(rules: [:check, :field])
      .to_h
      .merge(user: current_user)
      .symbolize_keys
  end
end
