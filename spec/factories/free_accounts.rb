FactoryBot.define do
  factory :free_account do
    email { Faker::Internet.email }
    password 'blahblah'
    password_confirmation 'blahblah'
  end
end
