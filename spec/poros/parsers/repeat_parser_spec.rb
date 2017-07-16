RSpec.describe RepeatParser do

  let(:parser) { described_class.new }

  it 'parses * repeats with "d" abbreviation for days' do
    result = parser.('eat *1d breakfast')
    expect(result).to eq(title: 'eat breakfast', repeat_seconds: 1.day)
  end

  it 'parses * repeats with "w" abbreviation for weeks' do
    result = parser.('*1w do laundry')
    expect(result).to eq(title: 'do laundry', repeat_seconds: 1.week)
  end

  it 'parses * repeats with "h" abbreviation for hours' do
    result = parser.('check email *5h')
    expect(result).to eq(title: 'check email', repeat_seconds: 5.hours)
  end

  it 'parses * repeats with "mi" abbreviation for minutes' do
    result = parser.('check email *5mi')
    expect(result).to eq(title: 'check email', repeat_seconds: 5.minutes)
  end

  it 'parses * repeats with "m" abbreviation for minutes' do
    result = parser.('check email *5m')
    expect(result).to eq(title: 'check email', repeat_seconds: 5.minutes)
  end

  it 'parses * repeats with "s" abbreviation for seconds' do
    result = parser.('get distracted *15s')
    expect(result).to eq(title: 'get distracted', repeat_seconds: 15.seconds)
  end

  it 'parses * repeats with "mo" abbreviation for months' do
    result = parser.('*3mo eat sushi')
    expect(result).to eq(title: 'eat sushi', repeat_seconds: 3.months)
  end

  it 'parses * repeats with "y" abbreviation for years' do
    result = parser.('*1y go on vacation')
    expect(result).to eq(title: 'go on vacation', repeat_seconds: 1.year)
  end

  it 'does not parse repeat without *' do
    result = parser.('1y do nothing')
    expect(result).to eq(title: '1y do nothing', repeat_seconds: nil)
  end

  it 'parses only the first repeat in the string' do
    result = parser.('*6mo get rich *1y')
    expect(result).to eq(title: 'get rich *1y', repeat_seconds: 6.months)
  end

end
