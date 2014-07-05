require 'spec_helper'

describe TitleParser, '#parse_release_at' do

  let(:parser) { TitleParser.new }

  context 'when time is in the past' do
    it 'returns nil if the string includes a date' do
      time = 50.years.ago.round
      time_string = time.strftime('%m/%d/%Y')
      result = parser.parse_release_at("do it ^#{time_string}-10:15")
      expect(result).to eq ['do it', nil]
    end

    it 'returns a time tomorrow if the string has just a time of day' do
      time = 1.hour.ago.round
      time -= time.sec
      time_string = time.strftime('%I:%M%P')
      result = parser.parse_release_at("do it ^#{time_string}")
      expect(result).to eq ['do it', time + 1.day]
    end
  end

  it 'returns a time in the future' do
    time = 1.hour.from_now.round
    time -= time.sec
    time_string = time.strftime('%I:%M%P')
    result = parser.parse_release_at("do it ^#{time_string}")
    expect(result).to eq ['do it', time]
  end

  it 'ignores timestamps not starting with ^' do
    time = 1.hour.from_now.round
    time -= time.sec
    time_string = time.strftime('%I:%M%P')
    title = "do it #{time_string}"
    result = parser.parse_release_at(title)
    expect(result).to eq [title, nil]
  end

end
