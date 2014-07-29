require 'spec_helper'

describe TitleParser, '#parse' do

  let(:parser) { TitleParser.new }

  it 'returns an empty hash when the title is nil' do
    expect(parser.parse(nil)).to eq({})
  end

  it 'pulls the markers out of the string' do
    time = 1.hour.from_now.round
    time -= time.sec
    time_string = time.strftime('%I:%M%P')
    title = "#at-home take out trash !3 #lame *1w ~5mi @#{time_string}"
    result = parser.parse(title)
    expect(result[:title]).to eq 'take out trash'
    expect(result[:tag_names].sort).to eq %w(at-home lame)
    expect(result[:priority]).to eq 3
    expect(result[:repeat_seconds]).to eq 1.week
    expect(result[:estimate_seconds]).to eq 5.minutes
    expect(result[:release_at]).to eq time
  end

  it 'returns no keys for missing markers' do
    result = parser.parse('nothing special')
    expect(result[:title]).to eq 'nothing special'
    [
      :tag_names,
      :priority,
      :repeat_seconds,
      :estimate_seconds,
      :release_at,
    ].each do |marker|
      expect(result).not_to have_key(marker)
    end
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse('#at-home take out trash')
    expect(result[:tag_names]).to eq %w(at-home)
    result = parser.parse('#at-home eat stuff #at-work')
    expect(result[:tag_names].sort).to eq %w(at-home at-work)
  end

end
