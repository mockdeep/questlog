require 'spec_helper'

describe ApplicationController do

  let(:user) { create(:user) }

  describe '#check_repeats' do
    let(:params) { { user: user, repeat_string: 'every week' } }

    before(:each) do
      session[:user_id] = user.id
    end

    it 'marks quickies as not done if they are ready to release' do
      quickie1 = create(:quickie, params)

      params.merge!(done_at: 2.weeks.ago, :release_at => 1.hour.ago)
      quickie2 = create(:quickie, params)

      params.merge!(:release_at => 1.hour.from_now)
      quickie3 = create(:quickie, params)

      controller.send(:check_repeats)

      expect(quickie1.reload).not_to be_done
      expect(quickie2.reload).not_to be_done
      expect(quickie3.reload).to be_done
    end
  end

end
