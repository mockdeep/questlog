# frozen_string_literal: true

RSpec.describe TasksController, "#index" do
  let(:user) { create(:user) }

  before { login_as(user) }

  it "renders all incomplete tasks for the user" do
    create(:task, user:, done_at: 1.week.ago)
    task_2 = create(
      :task,
      user:,
      done_at: 1.week.ago,
      release_at: 1.week.from_now,
    )
    task_3 = create(:task, user:)

    get "/tasks", as: :json

    serial_tasks = {
      "data" => [
        hash_including(
          "id" => task_3.id,
          "releaseAt" => nil,
          "pending" => false,
        ),
        hash_including(
          "id" => task_2.id,
          "releaseAt" => task_2.release_at.as_json,
          "pending" => true,
        ),
      ],
    }

    expect(response.parsed_body).to match serial_tasks
  end

  it "renders the user's tasks onto the react mount element" do
    create(:task, user:, title: "wash the dishes")

    get "/tasks"
    tasks = mount_value("data-react-tasks-value")

    expect(tasks.pluck("title")).to eq(["wash the dishes"])
  end

  it "renders the user's tags onto the react mount element" do
    get "/tasks"
    tags = mount_value("data-react-tags-value")

    expect(tags.pluck("name")).to eq(["All", "Untagged", "Needs Estimate"])
  end

  def mount_value(attribute)
    element = rendered.find("[data-controller='react']")

    JSON.parse(element[attribute])
  end
end
