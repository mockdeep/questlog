class TagsController < ApplicationController

  def index
    respond_to { |format| format.json { render json: tags } }
  end

private

  def tags
    current_user.ordered_tags.active.tap do |tags|
      tags.unshift(untagged_tag) if current_user.untagged_tasks.any?
      tags.unshift(all_tag)
    end
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
      unfinished_tasks_count: current_user.unfinished_tasks_count,
      slug: '',
      tasks: current_user.unfinished_tasks,
    )
  end

end
