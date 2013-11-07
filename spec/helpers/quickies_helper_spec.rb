require 'spec_helper'

describe QuickiesHelper do

  let(:quickie) { Quickie.new }

  describe '#quickie_classes' do
    context 'when the quickie has a priority' do
      it 'returns a string with the priority' do
        quickie.priority = 1
        expect(helper.quickie_classes(quickie)).to eq 'priority1'
      end
    end

    context 'when the quickie is over skipped' do
      it 'returns the string "over_skipped"' do
        quickie.stub(:over_skipped?).and_return(true)
        expect(helper.quickie_classes(quickie)).to eq 'over_skipped'
      end
    end

    context 'when priority and over skipped' do
      it 'returns a string with "over_skipped" and the priority' do
        quickie.priority = 2
        quickie.stub(:over_skipped?).and_return(true)
        expect(helper.quickie_classes(quickie)).to eq 'priority2 over_skipped'
      end
    end

    context 'when the quickie has no priority and is not over skipped' do
      it 'returns a blank string' do
        expect(helper.quickie_classes(quickie)).to eq ''
      end
    end
  end

end
