RSpec.describe BulkTasksController, "#new" do
  it "renders the bulk task form" do
    get(:new)

    expect(rendered).to have_field("bulk_task_titles")
  end
end
