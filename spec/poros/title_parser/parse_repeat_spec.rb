require 'spec_helper'

describe TitleParser, '#parse_repeat' do

  let(:parser) { TitleParser.new }

  it 'parses * repeats with "d" abbreviation for days' do
    result = parser.parse_repeat('eat *1d breakfast')
    expect(result).to eq ['eat breakfast', 1.day]
  end

  it 'parses * repeats with "w" abbreviation for weeks' do
    result = parser.parse_repeat('*1w do laundry')
    expect(result).to eq ['do laundry', 1.week]
  end

  it 'parses * repeats with "mi" abbreviation for minutes' do
    result = parser.parse_repeat('check email *5mi')
    expect(result).to eq ['check email', 5.minutes]
  end

  it 'parses * repeats with "s" abbreviation for seconds' do
    result = parser.parse_repeat('get distracted *15s')
    expect(result).to eq ['get distracted', 15.seconds]
  end

  it 'parses * repeats with "mo" abbreviation for months' do
    result = parser.parse_repeat('*3mo eat sushi')
    expect(result).to eq ['eat sushi', 3.months]
  end

  it 'parses * repeats with "y" abbreviation for years' do
    result = parser.parse_repeat('*1y go on vacation')
    expect(result).to eq ['go on vacation', 1.year]
  end

  it 'does not parse repeat without *' do
    result = parser.parse_repeat('1y do nothing')
    expect(result).to eq ['1y do nothing', nil]
  end

  it 'parses only the first repeat in the string' do
    result = parser.parse_repeat('*6mo get rich *1y')
    expect(result).to eq ['get rich *1y', 6.months]
  end

end
