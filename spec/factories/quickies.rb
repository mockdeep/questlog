FactoryGirl.define do
  factory :quickie do
    user
    title { Faker::Lorem.sentence }
  end
end
