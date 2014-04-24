FactoryGirl.define do
  factory :task do
    user
    title { Faker::Lorem.sentence }
  end
end
