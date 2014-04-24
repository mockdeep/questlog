require 'spec_helper'

describe ApplicationController do

  let(:user) { create(:user) }

  describe '#check_repeats' do
    let(:params) { { user: user, repeat_string: 'every week' } }

    before(:each) do
      session[:user_id] = user.id
    end

    it 'marks tasks as not done if they are ready to release' do
      task1 = create(:task, params)

      params.merge!(done_at: 2.weeks.ago, release_at: 1.hour.ago)
      task2 = create(:task, params)

      params.merge!(release_at: 1.hour.from_now)
      task3 = create(:task, params)

      controller.send(:check_repeats)

      expect(task1.reload).not_to be_done
      expect(task2.reload).not_to be_done
      expect(task3.reload).to be_done
    end
  end

end
