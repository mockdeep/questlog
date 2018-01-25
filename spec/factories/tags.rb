FactoryBot.define do
  factory :tag do
    sequence(:name) { |n| "tag-#{n.to_s.rjust(4, '0')}" }
    user
  end
end
