def task_row(title)
  find('.task-list .task-input', text: title).find(:xpath, 'ancestor::tr')
end

def all_tasks_link
  find('a', text: 'ALL TASKS')
end

def timeframes_link
  find('a', text: 'TIMEFRAMES')
end
