# frozen_string_literal: true

FactoryBot.define do
  factory :tag_entry, class: "TagBoard::Entry" do
    id { 1 }
    name { "home" }
    priority { nil }
    slug { "home" }
    tasks { [] }

    skip_create
    initialize_with { new(**attributes) }
  end
end
