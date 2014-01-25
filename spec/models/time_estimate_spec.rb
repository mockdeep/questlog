describe TimeEstimate do

  describe '.maps' do
    it 'returns an array of pairs' do
      expect(TimeEstimate.maps).to include ['5 minutes', 5]
      expect(TimeEstimate.maps).to include ['30 minutes', 30]
      expect(TimeEstimate.maps).to include ['60 minutes', 60]
    end
  end

end
