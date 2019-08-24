RSpec.describe ChargesController, '#create' do

  let(:user) { create(:free_user) }
  let(:valid_params) do
    { stripeEmail: 'test@questlog.io', stripeToken: 'a_token' }
  end
  let(:mock_customer) { double(id: 'an_id') }

  before(:each) do
    login_as(user)
    allow(Stripe::Customer).to receive(:create).and_return(mock_customer)
    allow(Stripe::Charge).to receive(:create)
  end

  it 'sets the customer id on the user' do
    expect do
      post(:create, params: valid_params)
    end.to change { user.reload.customer_id }.from(nil).to('an_id')
  end

  context 'when charge is successfully created' do
    it 'renders the a success page' do
      post(:create, params: valid_params)
      expect(response.body).to match(/Thanks, you paid/)
    end
  end

  context 'when charge is not successfully created' do
    before(:each) do
      error = Stripe::CardError.new('bad news', 'param', code: 'code')
      allow(Stripe::Charge).to receive(:create).and_raise(error)
    end

    it 'flashes an error' do
      post(:create, params: valid_params)
      expect(flash[:error]).to eq 'bad news'
    end

    it 'redirects to the charges page' do
      post(:create, params: valid_params)
      expect(response).to redirect_to charges_path
    end

    it 'still sets the customer id on the user' do
      expect do
        post(:create, params: valid_params)
      end.to change { user.reload.customer_id }.from(nil).to('an_id')
    end
  end

end
