# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :quicky, :class => 'Quickie' do
    title { Faker::Lorem.words(3) }
  end
end
