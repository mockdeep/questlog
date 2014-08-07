describe ContextsHelper, '#active_class' do
  context 'when the context given matches the slug' do
    it 'returns "active"' do
      params[:slug] = 'boo'
      context = double(slug: 'boo')
      expect(helper.active_class(context)).to eq 'active'
    end
  end

  context 'when the context given does not match the slug' do
    it 'returns ""' do
      params[:slug] = 'boo'
      context = double(slug: 'boogie')
      expect(helper.active_class(context)).to eq ''
    end
  end
end
