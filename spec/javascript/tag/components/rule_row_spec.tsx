import React from 'react';
import {shallow} from 'enzyme';

import RuleRow from 'src/tag/components/rule_row';

const tagRule: TagRule = {field: 'estimateSeconds', check: 'isBlank'};
const props = {
  deleteRule: jest.fn(),
  index: 1,
  rule: tagRule,
  updateFieldValue: jest.fn(),
};

it('renders a select tag', () => {
  const component = shallow(<RuleRow {...props} />);

  expect(component.find('select')).toHaveLength(2);
});
