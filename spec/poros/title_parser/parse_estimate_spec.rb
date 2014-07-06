require 'spec_helper'

describe TitleParser, '#parse_estimate' do

  let(:parser) { TitleParser.new }

  it 'parses ~ estimates with "d" abbreviation for days' do
    result = parser.parse_estimate('eat ~1d breakfast')
    expect(result).to eq ['eat breakfast', 1.day]
  end

  it 'parses ~ estimates with "w" abbreviation for weeks' do
    result = parser.parse_estimate('~1w do laundry')
    expect(result).to eq ['do laundry', 1.week]
  end

  it 'parses ~ estimates with "mi" abbreviation for minutes' do
    result = parser.parse_estimate('check email ~5mi')
    expect(result).to eq ['check email', 5.minutes]
  end

  it 'parses ~ estimates with "s" abbreviation for seconds' do
    result = parser.parse_estimate('get distracted ~15s')
    expect(result).to eq ['get distracted', 15.seconds]
  end

  it 'parses ~ estimates with "mo" abbreviation for months' do
    result = parser.parse_estimate('~3mo eat sushi')
    expect(result).to eq ['eat sushi', 3.months]
  end

  it 'parses ~ estimates with "y" abbreviation for years' do
    result = parser.parse_estimate('~1y go on vacation')
    expect(result).to eq ['go on vacation', 1.year]
  end

  it 'does not parse estimate without ~' do
    result = parser.parse_estimate('1y do nothing')
    expect(result).to eq ['1y do nothing', nil]
  end

  it 'parses only the first estimate in the string' do
    result = parser.parse_estimate('~6mo get rich ~1y')
    expect(result).to eq ['get rich ~1y', 6.months]
  end

end
