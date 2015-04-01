require 'spec_helper'

describe EstimateParser, '#parse' do

  let(:parser) { EstimateParser.new }

  it 'parses ~ estimates with "d" abbreviation for days' do
    result = parser.parse('eat ~1d breakfast')
    expect(result).to eq(title: 'eat breakfast', estimate_seconds: 1.day)
  end

  it 'parses ~ estimates with "w" abbreviation for weeks' do
    result = parser.parse('~1w do laundry')
    expect(result).to eq(title: 'do laundry', estimate_seconds: 1.week)
  end

  it 'parses * repeats with "h" abbreviation for hours' do
    result = parser.parse('check email ~5h')
    expect(result).to eq(title: 'check email', estimate_seconds: 5.hours)
  end

  it 'parses ~ estimates with "mi" abbreviation for minutes' do
    result = parser.parse('check email ~5mi')
    expect(result).to eq(title: 'check email', estimate_seconds: 5.minutes)
  end

  it 'parses ~ estimates with "m" abbreviation for minutes' do
    result = parser.parse('check email ~5m')
    expect(result).to eq(title: 'check email', estimate_seconds: 5.minutes)
  end

  it 'parses ~ estimates with "s" abbreviation for seconds' do
    result = parser.parse('get distracted ~15s')
    expected = { title: 'get distracted', estimate_seconds: 15.seconds }
    expect(result).to eq(expected)
  end

  it 'parses ~ estimates with "mo" abbreviation for months' do
    result = parser.parse('~3mo eat sushi')
    expect(result).to eq(title: 'eat sushi', estimate_seconds: 3.months)
  end

  it 'parses ~ estimates with "y" abbreviation for years' do
    result = parser.parse('~1y go on vacation')
    expect(result).to eq(title: 'go on vacation', estimate_seconds: 1.year)
  end

  it 'does not parse estimate without ~' do
    result = parser.parse('1y do nothing')
    expect(result).to eq(title: '1y do nothing', estimate_seconds: nil)
  end

  it 'parses only the first estimate in the string' do
    result = parser.parse('~6mo get rich ~1y')
    expect(result).to eq(title: 'get rich ~1y', estimate_seconds: 6.months)
  end

end
