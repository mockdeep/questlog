# frozen_string_literal: true

ACCEPT = "HTTP_ACCEPT"
TURBO_FRAME = "HTTP_TURBO_FRAME"

RSpec.describe "Response formats" do
  it "renders html when a scanner asks for json" do
    login_with_a_task

    get("/", headers: accepting("application/json"))

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "renders html when a scanner asks for an unknown format" do
    login_with_a_task

    get("/", headers: accepting("application/vnd.api+json"))

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "renders html for a browser" do
    login_with_a_task

    get("/", headers: accepting("text/html,application/xhtml+xml"))

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "renders html for turbo" do
    login_with_a_task

    get("/", headers: accepting("text/vnd.turbo-stream.html,text/html"))

    expect(rendered).to have_css("#task", text: "wash the dishes")
  end

  it "renders the frame for a turbo frame request" do
    login_with_a_task

    get("/help", headers: in_frame("dialog"))

    expect(rendered).to have_css("turbo-frame#dialog")
  end

  it "has no route for a json extension" do
    login_with_a_task

    expect { get("/tasks.json") }.to raise_error(ActionController::RoutingError)
  end

  def login_with_a_task
    task = create(:task, title: "wash the dishes")
    login_as(task.user)
  end

  def accepting(types)
    { ACCEPT => types }
  end

  def in_frame(name)
    accepting("text/html,application/xhtml+xml").merge(TURBO_FRAME => name)
  end
end
