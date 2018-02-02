import React from 'react';
import {shallow} from 'enzyme';

import TaskCheckbox from 'src/task/components/checkbox';
import {makeTask} from '_test_helpers/factories';

const task = makeTask();
const props = {task};

it('enables the checkbox by default', () => {
  const component = shallow(<TaskCheckbox {...props} />);

  expect(component.find('input[type="checkbox"]')).not.toBeDisabled();
});

describe('when passed a "disabled" prop', () => {
  it('disables the checkbox', () => {
    const component = shallow(<TaskCheckbox {...props} disabled />);

    expect(component.find('input[type="checkbox"]')).toBeDisabled();
  });

  it('does not add an "enabled" class', () => {
    const component = shallow(<TaskCheckbox {...props} disabled />);

    expect(component.find('label').prop('className')).not.toMatch('enabled');
  });
});

it('passes an onChange callback through to the checkbox', () => {
  const onChange = jest.fn();
  const component = shallow(<TaskCheckbox {...props} onChange={onChange} />);

  component.find('input[type="checkbox"]').simulate('change');

  expect(onChange).toHaveBeenCalled();
});

it('adds a "checked" class to the label when checked', () => {
  const component = shallow(<TaskCheckbox {...props} checked />);

  const expectedClass = 'task-item__checkbox-display--checked';
  const actualClass = component.find('label').prop('className');
  expect(actualClass.split(' ')).toContain(expectedClass);
});

it('adds an "enabled" class to the label when not disabled', () => {
  const component = shallow(<TaskCheckbox {...props} />);

  const expectedClass = 'task-item__checkbox-display--enabled';
  const actualClass = component.find('label').prop('className');
  expect(actualClass.split(' ')).toContain(expectedClass);
});
