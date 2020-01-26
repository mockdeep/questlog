RSpec.describe ChargesController, '#new' do
  it 'renders a script tag with the stripe checkout source' do
    stripe_publishable_key = ENV['STRIPE_PUBLISHABLE_KEY']
    expect(stripe_publishable_key).not_to be_blank

    get(:new)

    body = Capybara.string(response.body)
    script_tag = body.find('.stripe-button', visible: false)

    expect(script_tag['data-key']).to eq(stripe_publishable_key)
  end
end
