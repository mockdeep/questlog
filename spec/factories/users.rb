FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'blahblah' }
    password_confirmation { 'blahblah' }
    mode 'simple'
  end
end
