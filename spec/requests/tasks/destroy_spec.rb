# frozen_string_literal: true

REFERER = "HTTP_REFERER"

RSpec.describe TasksController, "#destroy" do
  it "deletes the task" do
    task = create(:task)
    login_as(task.user)

    delete "/tasks/#{task.id}"

    expect(task.user.tasks).to be_empty
  end

  it "returns to the page the task was deleted from" do
    task = create(:task)
    login_as(task.user)

    delete "/tasks/#{task.id}", headers: referer

    expect(response).to redirect_to("/timeframes")
  end

  it "refuses to delete a task belonging to someone else" do
    task = create(:task)
    login_as(create(:user))

    expect { delete "/tasks/#{task.id}" }
      .to raise_error(ActiveRecord::RecordNotFound)
  end

  def referer
    { REFERER => "/timeframes" }
  end
end
