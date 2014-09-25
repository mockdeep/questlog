require 'spec_helper'

describe ReleaseAtParser, '#parse' do

  let(:parser) { ReleaseAtParser.new }

  context 'when time is in the past' do
    it 'returns nil if the string includes a date' do
      time = 50.years.ago.round
      time_string = time.strftime('%d/%m/%Y')
      result = parser.parse("do it @#{time_string}-10:15")
      expect(result).to eq(title: 'do it', release_at: nil)
    end

    it 'returns a time tomorrow if the string has just a time of day' do
      time = 1.hour.ago.round
      time -= time.sec
      time_string = time.strftime('%I:%M%P')
      result = parser.parse("do it @#{time_string}")
      expect(result).to eq(title: 'do it', release_at: time + 1.day)
    end
  end

  it 'returns a time in the future' do
    time = 1.hour.from_now.round
    time -= time.sec
    time_string = time.strftime('%I:%M%P')
    result = parser.parse("do it @#{time_string}")
    expect(result).to eq(title: 'do it', release_at: time)
  end

  it 'returns a datetime in the future' do
    time = 3.weeks.from_now
    time -= time.sec
    time_string = time.strftime('%d/%m/%Y-%I:%M%P')
    result = parser.parse("do it @#{time_string}")
    expect(result[:title]).to eq 'do it'
    expect(result[:release_at].to_i).to eq time.to_i
  end

  it 'ignores timestamps not starting with @' do
    time = 1.hour.from_now.round
    time -= time.sec
    time_string = time.strftime('%I:%M%P')
    title = "do it #{time_string}"
    result = parser.parse(title)
    expect(result).to eq(title: title, release_at: nil)
  end

end
