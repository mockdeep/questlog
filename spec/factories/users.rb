FactoryBot.define do
  factory :user do
    account

    factory :free_user do
      account factory: :free_account
    end
  end
end
