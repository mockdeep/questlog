import React from 'react';
import {shallow} from 'enzyme';

import RuleRow from 'src/tag/components/rule_row';

const props = {
  deleteRule: jest.fn(),
  index: 1,
  rule: {},
  updateFieldValue: jest.fn(),
};

it('renders a select tag', () => {
  const component = shallow(<RuleRow {...props} />);

  expect(component.find('select')).toHaveLength(1);
});
