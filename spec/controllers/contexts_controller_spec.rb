require 'spec_helper'

describe ContextsController do

  let(:context) { create(:context, user: user) }
  let(:quickie) { create(:quickie, user: user) }
  let(:user) { create(:user) }
  let(:valid_params) { attributes_for(:context) }

  before(:each) do
    login_as(user)
  end

  describe '#create' do
    context 'if context is valid' do
      it 'redirects to root' do
        post(:create, context: valid_params)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'if context is not valid' do
      before(:each) do
        Context.any_instance.stub(:save).and_return(false)
      end

      it 'initializes a new quickie' do
        post(:create, context: valid_params)
        expect(assigns(:new_quickie)).to be_new_record
      end

      it 'initializes the next quickie' do
        quickie
        post(:create, context: valid_params)
        expect(assigns(:quickie)).to eq quickie
      end

      it 'initializes a collection of contexts' do
        context
        post(:create, context: valid_params)
        expect(assigns(:contexts)).to eq [context]
      end

      it 'renders "quickies/show"' do
        post(:create, context: valid_params)
        expect(response).to render_template('quickies/show')
      end
    end
  end

end
