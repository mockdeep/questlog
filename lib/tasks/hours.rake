desc 'list minute totals for each context'
task minutes: :environment do
  time = Time.now.in_time_zone('Pacific Time (US & Canada)')
  user = User.find_by_email('lobatifricha@gmail.com')
  user.contexts.collect do |context|
    puts "#{context.name}:"
    (-6..0).each do |offset|
      this_time = time.advance(days: offset)
      day_name = Date::DAYNAMES[this_time.wday].ljust(10)
      minutes = "#{context.minutes_for_day(this_time)} minutes".rjust(11)
      puts "  #{day_name}: #{minutes}"
    end
  end
end
