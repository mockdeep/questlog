import React from 'react';
import {shallow} from 'enzyme';

import Link from 'src/route/components/link';

const props = {
  to: 'root',
  routeName: 'whatever',
  setRoute: jest.fn(),
};

it('renders an anchor tag', () => {
  const component = shallow(<Link {...props}>{'texty text'}</Link>);

  expect(component.find('a')).toHaveProp('children', 'texty text');
});

it('adds className to the element when given as a prop', () => {
  const overrides = {className: 'class-one class-two'};
  const component = shallow(<Link {...props} {...overrides}>{'texty'}</Link>);

  expect(component.find('a')).toHaveProp('className', 'class-one class-two');
});

it('does not add any classes when no className given', () => {
  const component = shallow(<Link {...props}>{'texty text'}</Link>);

  expect(component.find('a')).toHaveProp('className', '');
});

describe('given a baseClass prop', () => {
  it('adds baseClass as the className', () => {
    const overrides = {baseClass: 'best-base'};

    const component = shallow(<Link {...props} {...overrides}>{'texty'}</Link>);

    expect(component.find('a')).toHaveProp('className', 'best-base');
  });

  it('adds a "--active" class when link matches route', () => {
    const overrides = {baseClass: 'best-base', routeName: 'root'};

    const component = shallow(<Link {...props} {...overrides}>{'texty'}</Link>);

    const expected = 'best-base best-base--active';
    expect(component.find('a')).toHaveProp('className', expected);
  });

  it('combines baseClass and className', () => {
    const overrides = {baseClass: 'best-base', className: 'best-class'};

    const component = shallow(<Link {...props} {...overrides}>{'texty'}</Link>);

    expect(component.find('a')).toHaveProp('className', 'best-base best-class');
  });

  it('combines baseClass and className when link matches route', () => {
    const overrides = {baseClass: 'best', className: 'bast', routeName: 'root'};

    const component = shallow(<Link {...props} {...overrides}>{'texty'}</Link>);

    const expected = 'best best--active bast';
    expect(component.find('a')).toHaveProp('className', expected);
  });
});
