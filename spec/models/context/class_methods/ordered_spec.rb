require 'spec_helper'

describe Context, '.ordered' do

  it 'returns contexts ordered by name' do
    context1 = create(:context, name: 'bill')
    context2 = create(:context, name: 'alice')
    context3 = create(:context, name: 'charlie')
    expect(Context.ordered).to eq [context2, context1, context3]
  end

end
