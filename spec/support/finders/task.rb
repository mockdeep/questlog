def task_row(title)
  find('.task-list .task-input', text: title).find(:xpath, 'ancestor::tr')
end
