require 'spec_helper'

describe TitleParser, '#parse_tags' do

  let(:parser) { TitleParser.new }

  it 'returns an empty array for tag_names when no tags are in the string' do
    expect(parser.parse_tags('do something')).to eq ['do something', []]
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse_tags('#at-home take out trash')
    expect(result).to eq ['take out trash', %w(at-home)]
    result = parser.parse_tags('#at-home eat stuff #at-work')
    expect(result).to eq ['eat stuff', %w(at-home at-work)]
  end

  it 'does not grab numbers from the string' do
    expect(parser.parse_tags('I am #1 for real')).to eq ['I am #1 for real', []]
  end

  it 'returns an empty array for impro#per tag names' do
    expect(parser.parse_tags('poo#tag')).to eq ['poo#tag', []]
    expect(parser.parse_tags('bloo#')).to eq ['bloo#', []]
    expect(parser.parse_tags('#')).to eq ['#', []]
  end

end
