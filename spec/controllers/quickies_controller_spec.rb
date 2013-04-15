require 'spec_helper'

describe QuickiesController do
  let(:quickie) { create(:quickie) }
  let(:user) { quickie.user }
  let(:valid_params) { attributes_for(:quickie) }

  before(:each) do
    login_as(user)
  end

  describe '#show' do
    it 'initializes a new Quickie' do
      get(:show)
      expect(assigns(:new_quickie)).to be_new_record     
    end

    context 'when there are no unfinished quickies' do
      it '@quickie is nil' do
        quickie.update_attributes(done: true)
        get(:show)
        expect(assigns(:quickie)).to be_nil
      end
    end

    context 'when there are unfinished quickies' do
      it '@quickie is a Quickie' do
        get(:show)
        expect(assigns(:quickie)).to eq quickie
      end
    end
  end

  describe '#create' do
    context 'when the quickie is valid' do
      it 'redirects to root' do
        post(:create, quickie: valid_params)
        response.should redirect_to(root_path)
      end
    end

    context 'when the quickie is not valid' do
      it 'renders "show"' do
        Quickie.any_instance.stub(:save).and_return(false)
        post(:create, quickie: valid_params)
        response.should render_template('quickies/show')
      end
    end
  end
end
