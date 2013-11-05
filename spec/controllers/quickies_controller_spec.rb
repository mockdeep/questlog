require 'spec_helper'

describe QuickiesController do
  let(:quickie) { create(:quickie) }
  let(:user) { quickie.user }
  let(:valid_params) { attributes_for(:quickie) }
  let(:context) { create(:context, user: user) }

  describe '#show' do
    before(:each) do
      login_as(user)
    end

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

    it 'sets existing Context' do
      context
      get(:show)
      expect(assigns(:contexts)).to eq [context]
    end
  end

  describe '#create' do
    before(:each) do
      request.env["HTTP_REFERER"] = root_url
    end

    context 'when the user does not exist' do
      it 'creates a new user' do
        expect {
          post(:create, quickie: valid_params)
        }.to change(User, :count).by(1)
      end

      it 'sets the current user in the session' do
        expect(session[:user_id]).to be_nil
        post(:create, quickie: valid_params)
        expect(session[:user_id]).not_to be_nil
      end
    end

    context 'when the quickie is valid' do
      it 'redirects to root' do
        post(:create, quickie: valid_params)
        expect(response).to redirect_to(root_path)
      end
    end

    context 'when the quickie is not valid' do
      it 'renders "show"' do
        Quickie.any_instance.stub(:save).and_return(false)
        post(:create, quickie: valid_params)
        expect(response).to render_template('quickies/show')
      end
    end
  end

  describe '#destroy' do
    before(:each) do
      login_as(user)
    end

    it 'destroys the quickie for the given user' do
      request.env["HTTP_REFERER"] = '/whatevs'
      quickie.context_ids = [context.id]
      expect(context.quickies).to eq([quickie])
      expect(context.reload.quickies_count).to eq(1)
      delete(:destroy, id: quickie.id)

      expect(context.reload.quickies).to eq([])
      expect(context.quickies_count).to eq(0)
    end
  end
end
