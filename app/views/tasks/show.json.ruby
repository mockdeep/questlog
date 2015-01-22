if @task
  attrs = %w(id priority title repeat_seconds skip_count)
  task_attrs = @task.attributes.slice(*attrs)
  { task: task_attrs.merge(tag_names: @task.tag_names) }
end.to_json
