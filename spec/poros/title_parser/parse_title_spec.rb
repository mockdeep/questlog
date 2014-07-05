require 'spec_helper'

describe TitleParser, '#parse_title' do

  let(:parser) { TitleParser.new }

  it 'pulls the markers out of the string' do
    result = parser.parse_title('#at-home take out trash !3 #lame')
    expect(result[:title]).to eq 'take out trash'
    expect(result[:tag_names].sort).to eq %w(at-home lame)
    expect(result[:priority]).to eq 3
  end

  it 'returns an empty array for tag_names when no tags are in the string' do
    result = parser.parse_title('do something')
    expect(result[:tag_names]).to eq []
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse_title('#at-home take out trash')
    expect(result[:tag_names]).to eq %w(at-home)
    result = parser.parse_title('#at-home eat stuff #at-work')
    expect(result[:tag_names].sort).to eq %w(at-home at-work)
  end

end
