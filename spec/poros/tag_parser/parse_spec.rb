require 'spec_helper'

describe TagParser, '#parse' do

  let(:parser) { TagParser.new }

  it 'returns an empty array for tag_names when no tags are in the string' do
    expected = { title: 'do something', tag_names: [] }
    expect(parser.parse('do something')).to eq(expected)
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse('#at-home take out trash')
    expect(result).to eq(title: 'take out trash', tag_names: %w(at-home))
    result = parser.parse('#at-home eat stuff #at-work')
    expected = { title: 'eat stuff', tag_names: %w(at-home at-work) }
    expect(result).to eq(expected)
  end

  it 'does not grab numbers from the string' do
    expected = { title: 'I am #1 for real', tag_names: [] }
    expect(parser.parse('I am #1 for real')).to eq(expected)
  end

  it 'returns an empty array for impro#per tag names' do
    expect(parser.parse('poo#tag')).to eq(title: 'poo#tag', tag_names: [])
    expect(parser.parse('bloo#')).to eq(title: 'bloo#', tag_names: [])
    expect(parser.parse('#')).to eq(title: '#', tag_names: [])
  end

end
