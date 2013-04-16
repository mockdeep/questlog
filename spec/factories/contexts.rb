FactoryGirl.define do
  factory :context do
    name { Faker::Lorem.word }
    user
  end
end
