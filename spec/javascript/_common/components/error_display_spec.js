import React from 'react';
import {shallow} from 'enzyme';

import ErrorDisplay from 'src/_common/components/error_display';

const renderOpts = {lifecycleExperimental: true};

it('renders the given errors', () => {
  const errors = ['one error', 'two error'];
  const component = shallow(<ErrorDisplay errors={errors} />, renderOpts);

  const errorMessages = component.find('.error-messages li');

  expect(errorMessages).toHaveLength(2);
  expect(errorMessages.at(0)).toHaveText('one error');
  expect(errorMessages.at(1)).toHaveText('two error');
});
