def task_row(title)
  find('.tasks-table .task-input', text: title).find(:xpath, 'ancestor::tr')
end
