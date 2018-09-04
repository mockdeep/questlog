import React from 'react';
import {mount, shallow} from 'enzyme';

import ReactElmWrapper from 'src/_common/components/react_elm_wrapper';

const src = {embed: jest.fn()};
const props = {src};

it('does not update', () => {
  const component = shallow(<ReactElmWrapper {...props} />);
  const instance = component.instance() as ReactElmWrapper;

  expect(instance.shouldComponentUpdate()).toBe(false);
});

it('embeds the src prop', () => {
  const component = mount(<ReactElmWrapper {...props} />);
  const instance = component.instance() as ReactElmWrapper;

  const [firstArg, secondArg] = src.embed.mock.calls[0];
  expect(firstArg).not.toBeUndefined();
  expect(firstArg).toBe(instance.node);
  expect(secondArg).toBeUndefined();
});

it('passes flags prop to embed when given', () => {
  const flags = {flogs: 'floogs'};
  const component = shallow(<ReactElmWrapper {...props} flags={flags} />);
  const instance = component.instance() as ReactElmWrapper;

  expect(src.embed).toHaveBeenCalledWith(instance.node, flags);
});

it('sets up ports when given', () => {
  const ports = jest.fn();
  src.embed.mockImplementation(() => ({ports: 'poots'}));

  shallow(<ReactElmWrapper {...props} ports={ports} />);

  expect(ports).toHaveBeenCalledWith('poots');
});
