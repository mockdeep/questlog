RSpec.describe HtmlConstraint do

  describe '#matches?' do
    let(:constraint) { described_class.new }
    let(:request) { OpenStruct.new(headers: {}) }

    it 'returns true when format has "text/html"' do
      request.headers['Accept'] = 'footext/htmlbar'
      expect(constraint.matches?(request)).to be true
    end

    it 'returns true when format has "*/*"' do
      request.headers['Accept'] = 'foo*/*bar'
      expect(constraint.matches?(request)).to be true
    end

    it 'returns true when format header is not set' do
      expect(constraint.matches?(request)).to be true
    end

    it 'returns false when format header is empty string' do
      request.headers['Accept'] = ''
      expect(constraint.matches?(request)).to be false
    end

    it 'returns false when format header is something else' do
      request.headers['Accept'] = 'application/json'
      expect(constraint.matches?(request)).to be false
    end
  end

end
