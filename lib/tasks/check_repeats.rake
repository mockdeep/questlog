desc 'Check repeats on tasks'
task check_repeats: :environment do
  Task.ready_to_release.find_each(&:release!)
end
