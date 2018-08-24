FactoryBot.define do
  factory :stat do
    user
    sequence(:value) { |n| n }
    timestamp { Time.zone.now }
    name { 'seconds-completed' }
  end
end
