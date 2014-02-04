desc 'Check repeats on quickies'
task check_repeats: :environment do
  Quickie.transaction do
    Quickie.ready_to_release.update_all(done_at: nil)
  end
end
