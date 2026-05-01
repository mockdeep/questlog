RSpec.describe "user accounts" do
  let(:user) { create(:user) }

  it "allows a user sign up for an account" do
    expect(page).to have_text("You're not logged in!")
    click_link("Sign up")
    fill_in "Email", with: "some@email.com"
    fill_in "Password", with: "my_password"
    fill_in "Password confirmation", with: "my_password"
    click_button "Create free account!"
    expect(page).to have_text("Log out")
    expect(page).to have_text("Logged in as some@email.com")
  end

  it "allows an existing user to log in" do
    click_link("Log in")
    fill_in "Email", with: user.account.email
    fill_in "Password", with: user.account.password
    click_button("Login")
    expect(page).to have_text("Logged in as #{user.email}")
    expect(page).to have_text("Logged in!")
  end
end
