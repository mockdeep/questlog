require 'spec_helper'

describe TagParser, '#parse' do

  let(:parser) { TagParser.new }

  it 'returns an empty array for tag_names when no tags are in the string' do
    expect(parser.parse('do something')).to eq ['do something', []]
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.parse('#at-home take out trash')
    expect(result).to eq ['take out trash', %w(at-home)]
    result = parser.parse('#at-home eat stuff #at-work')
    expect(result).to eq ['eat stuff', %w(at-home at-work)]
  end

  it 'does not grab numbers from the string' do
    expect(parser.parse('I am #1 for real')).to eq ['I am #1 for real', []]
  end

  it 'returns an empty array for impro#per tag names' do
    expect(parser.parse('poo#tag')).to eq ['poo#tag', []]
    expect(parser.parse('bloo#')).to eq ['bloo#', []]
    expect(parser.parse('#')).to eq ['#', []]
  end

end
