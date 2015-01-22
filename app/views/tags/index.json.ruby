tags_data = @tags.map do |tag|
  tag.attributes.slice(*%w(id slug unfinished_tasks_count name))
end

tags_data.unshift(
  id: 0,
  name: 'All',
  unfinished_tasks_count: current_user.unfinished_tasks_count,
  slug: '',
)
{ tags: tags_data }.to_json
