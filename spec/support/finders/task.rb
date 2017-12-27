def task_row(title)
  find(".task-list .task-input[value='#{title}']").find(:xpath, 'ancestor::tr')
end
