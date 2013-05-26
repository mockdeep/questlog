desc 'Check repeats on quickies'
task check_repeats: :environment do
  Quickie.transaction do
    Quickie.find_each do |quickie|
      if quickie.repeat && quickie.time_to_repeat?
        quickie.update_attributes(done: false)
      end
    end
  end
end
