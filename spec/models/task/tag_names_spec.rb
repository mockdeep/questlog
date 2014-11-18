require 'spec_helper'

describe Task, '#tag_names' do

  let(:task) { create(:task) }
  let(:tag) { create(:tag, name: 'what') }

  it 'returns @tag_names when defined' do
    task.tag_names = %w(apple pie)
    expect(task.tag_names).to eq %w(apple pie)
  end

  it 'returns the names of the associated tags when @tag_names not defined' do
    task.tags = [tag]
    expect(task.tag_names).to eq %w(what)
  end

end
