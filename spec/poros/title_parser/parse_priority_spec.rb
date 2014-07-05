require 'spec_helper'

describe TitleParser, '#parse_priority' do

  let(:parser) { TitleParser.new }

  it 'returns nil when there is no priority mark in the string' do
    expect(parser.parse_priority('whatevs')).to eq ['whatevs', nil]
  end

  it 'returns the numeric priority when there is a !1 priority in the string' do
    expect(parser.parse_priority('!1 pay the bills')).to eq ['pay the bills', 1]
    expect(parser.parse_priority('eat !2 beef')).to eq ['eat beef', 2]
    expect(parser.parse_priority('eat boogers !3')).to eq ['eat boogers', 3]
    expect(parser.parse_priority('e!3at boogers !3')).to eq ['e!3at boogers', 3]
    expect(parser.parse_priority('pri !1 not !2')).to eq ['pri not !2', 1]
  end

  it 'returns nil for priority when there is an !improper priority' do
    expect(parser.parse_priority('!what?')).to eq ['!what?', nil]
    expect(parser.parse_priority('!1way')).to eq ['!1way', nil]
    expect(parser.parse_priority('not!1')).to eq ['not!1', nil]
  end

end
