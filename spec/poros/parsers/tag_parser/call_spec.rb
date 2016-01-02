RSpec.describe TagParser, '#call' do

  let(:parser) { TagParser.new }

  it 'returns an empty array for tag_names when no tags are in the string' do
    expected = { title: 'do something', tag_names: [] }
    expect(parser.('do something')).to eq(expected)
  end

  it 'returns an array of tag_names when there are #tags in the string' do
    result = parser.('#at-home take out trash')
    expect(result).to eq(title: 'take out trash', tag_names: %w(at-home))
    result = parser.('#at-home eat stuff #at-work')
    expected = { title: 'eat stuff', tag_names: %w(at-home at-work) }
    expect(result).to eq(expected)
  end

  it 'does not grab numbers from the string' do
    expected = { title: 'I am #1 for real', tag_names: [] }
    expect(parser.('I am #1 for real')).to eq(expected)
  end

  it 'returns an empty array for impro#per tag names' do
    expect(parser.('poo#tag')).to eq(title: 'poo#tag', tag_names: [])
    expect(parser.('bloo#')).to eq(title: 'bloo#', tag_names: [])
    expect(parser.('#')).to eq(title: '#', tag_names: [])
  end

end
