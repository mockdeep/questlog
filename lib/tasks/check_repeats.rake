desc 'Check repeats on tasks'
task check_repeats: :environment do
  Task.ready_to_release.order(:release_at).find_each(&:release!)
end
