FactoryGirl.define do
  factory :context do
    sequence(:name) { |n| "context-#{n}" }
    user
  end
end
