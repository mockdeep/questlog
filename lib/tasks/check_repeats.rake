desc 'Check repeats on quickies'
task check_repeats: :environment do
  Quickie.transaction do
    # can't use update_all, since the done= method also updates counters
    Quickie.ready_to_release.each { |q| q.update_attributes(done: nil) }
  end
end
