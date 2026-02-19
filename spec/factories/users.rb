FactoryBot.define do
  factory :user do
    account factory: :free_account

    factory :guest_user do
      account factory: :guest_account
    end
  end
end
