import React from 'react';
import {shallow} from 'enzyme';

import ReactElmWrapper from 'src/_common/components/react_elm_wrapper';

const props = {src: {embed: jest.fn()}};

it('does not update', () => {
  const component = shallow(<ReactElmWrapper {...props} />);

  expect(component.instance().shouldComponentUpdate()).toBe(false);
});

it('embeds the src prop', () => {
  const component = shallow(<ReactElmWrapper {...props} />);

  const [firstArg, secondArg] = props.src.embed.mock.calls[0];
  expect(firstArg).toBe(component.instance().node);
  expect(secondArg).toBeUndefined();
});

it('passes flags prop to embed when given', () => {
  const flags = {flogs: 'floogs'};
  const component = shallow(<ReactElmWrapper {...props} flags={flags} />);

  expect(props.src.embed).toHaveBeenCalledWith(component.instance().node, flags);
});

it('sets up ports when given', () => {
  const ports = jest.fn();
  props.src.embed.mockImplementation(() => ({ports: 'poots'}));

  shallow(<ReactElmWrapper {...props} ports={ports} />);

  expect(ports).toHaveBeenCalledWith('poots');
});
