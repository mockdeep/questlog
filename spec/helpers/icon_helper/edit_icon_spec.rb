RSpec.describe IconHelper, "#edit_icon" do
  it "returns an icon element" do
    expected = '<i class="fas fa-edit" aria-hidden="true"></i>'
    expect(helper.edit_icon).to eq(expected)
  end
end
