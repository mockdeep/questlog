require 'spec_helper'

describe QuickieForm do

  let(:user) { User.new }
  let(:quickie_form) { QuickieForm.new(user) }
  let(:quickie) { quickie_form.quickie }

  describe '#submit' do
    context 'when given a title' do
      it 'handles @ strings' do
        quickie_form.submit(title: '@work eat something @home')
        expect(quickie.title).to eq 'eat something'
        expect(quickie.contexts.map(&:name)).to eq ['work', 'home']
      end

      it 'handles @ strings with various quotes' do
        quickie_form.submit(title: %{@"at work" eat "something" @'at home'})
        expect(quickie.title).to eq 'eat "something"'
        expect(quickie.contexts.map(&:name)).to eq ['at work', 'at home']
      end

      #it 'updates counters' do
      #  expect(user.quickies_count).to eq 0
      #  quickie_form.submit(title: %{@"at work" eat "something" @'at home'})
      #  quickie.reload
      #  quickie.contexts.each do |context|
      #    expect(context.quickies_count).to eq 1
      #  end
      #  expect(user.reload.quickies_count).to eq 1
      #end
    end

    context 'if repeat string is blank' do
      it 'sets it to nil' do
        quickie_form.submit(title: 'bloo blah', repeat_string: '')
        expect(quickie.repeat_string).to be_nil
      end
    end
  end

end
