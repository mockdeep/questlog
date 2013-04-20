desc 'Check repeats on quickies'
task check_repeats: :environment do
  Quickie.transaction do
    Quickie.find_each(&:check_repeat)
  end
end
