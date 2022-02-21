RSpec.describe IconHelper, '#edit_icon' do
  it 'returns an icon element' do
    expect(helper.edit_icon).to eq('<i class="fas fa-edit"></i>')
  end
end
