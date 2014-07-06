require 'spec_helper'

describe TitleParser, '#parse_title' do

  let(:parser) { TitleParser.new }

  it 'pulls the markers out of the string' do
    result = parser.parse_title('#at-home take out trash !3 #lame *1w ~5mi')
    expect(result[:title]).to eq 'take out trash'
    expect(result[:tag_names].sort).to eq %w(at-home lame)
    expect(result[:priority]).to eq 3
    expect(result[:repeat]).to eq 1.week
    expect(result[:estimate]).to eq 5.minutes
  end

  it 'returns no keys for missing markers' do
    result = parser.parse_title('nothing special')
    expect(result[:title]).to eq 'nothing special'
    [:tag_names, :priority, :repeat, :estimate].each do |marker|
      expect(result).not_to have_key(marker)
    end
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse_title('#at-home take out trash')
    expect(result[:tag_names]).to eq %w(at-home)
    result = parser.parse_title('#at-home eat stuff #at-work')
    expect(result[:tag_names].sort).to eq %w(at-home at-work)
  end

end
