# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'blahblah' }
    password_confirmation { 'blahblah' }
  end
end
