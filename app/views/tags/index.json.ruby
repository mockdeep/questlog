tags_data = @tags.map do |tag|
  tag_attrs = tag.attributes.slice(*%w(id slug unfinished_tasks_count name))
  tag_attrs.merge(priority: tag.priority)
end

if current_user.untagged_tasks.any?
  tags_data.unshift(
    id: -1,
    name: 'Untagged',
    unfinished_tasks_count: current_user.unfinished_tasks.untagged.count,
    slug: 'untagged',
    priority: current_user.untagged_tasks.highest_priority,
  )
end

tags_data.unshift(
  id: 0,
  name: 'All',
  unfinished_tasks_count: current_user.unfinished_tasks_count,
  slug: '',
  priority: current_user.unfinished_tasks.highest_priority,
)

{ tags: tags_data }.to_json
