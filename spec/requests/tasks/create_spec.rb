# frozen_string_literal: true

RSpec.describe TasksController, "#create" do
  let(:valid_params) { { task: attributes_for(:task) } }

  context "when the user does not exist" do
    it "creates a new user" do
      expect do
        post "/tasks", params: valid_params
      end.to change(User, :count).by(1)
    end

    it "sets the current user in the session" do
      post "/tasks", params: valid_params
      expect(session[:user_id]).not_to be_nil
    end
  end

  context "when the task is valid" do
    it "renders a flash message" do
      post "/tasks", params: valid_params

      expect(flash[:success]).to eq("Task added")
    end

    it "creates the task" do
      expect do
        post "/tasks", params: valid_params
      end.to change(Task, :count).by(1)
    end

    it "redirects to root_path" do
      post "/tasks", params: valid_params

      expect(response).to redirect_to(root_path)
    end
  end
end
