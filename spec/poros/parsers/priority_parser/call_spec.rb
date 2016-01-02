RSpec.describe PriorityParser, '#call' do

  let(:parser) { PriorityParser.new }

  it 'returns nil when there is no priority mark in the string' do
    expect(parser.('whatevs')).to eq(title: 'whatevs', priority: nil)
  end

  it 'returns the numeric priority when there is a !1 priority in the string' do
    strings_and_expecteds = {
      '!1 pay the bills' => { title: 'pay the bills', priority: 1 },
      'eat !2 beef' => { title: 'eat beef', priority: 2 },
      'eat boogers !3' => { title: 'eat boogers', priority: 3 },
      'e!3at boogers !3' => { title: 'e!3at boogers', priority: 3 },
      'pri !1 not !2' => { title: 'pri not !2', priority: 1 },
    }
    strings_and_expecteds.each do |string, expected|
      expect(parser.(string)).to eq expected
    end
  end

  it 'returns nil for priority when there is an !improper priority' do
    expect(parser.('!what?')).to eq(title: '!what?', priority: nil)
    expect(parser.('!1way')).to eq(title: '!1way', priority: nil)
    expect(parser.('not!1')).to eq(title: 'not!1', priority: nil)
  end

  it "returns the numeric priority when there is a '1 priority in the string" do
    strings_and_expecteds = {
      "'1 pay the bills" => { title: 'pay the bills', priority: 1 },
      "eat '2 beef" => { title: 'eat beef', priority: 2 },
      "eat boogers '3" => { title: 'eat boogers', priority: 3 },
      "e'3at boogers '3" => { title: "e'3at boogers", priority: 3 },
      "pri '1 not '2" => { title: "pri not '2", priority: 1 },
    }
    strings_and_expecteds.each do |string, expected|
      expect(parser.(string)).to eq expected
    end
  end

  it "returns nil for priority when there is an 'improper priority" do
    expect(parser.("'what?")).to eq(title: "'what?", priority: nil)
    expect(parser.("'1way")).to eq(title: "'1way", priority: nil)
    expect(parser.("not'1")).to eq(title: "not'1", priority: nil)
  end

end
