import React from 'react';
import {shallow} from 'enzyme';

import Sidebar from 'src/_common/components/sidebar';

const Link = 'Connect(Link)';

beforeEach(() => {
  document.body.innerHTML = '<div class="content"></div>';
});

it('updates the mobile status when screen size changes', () => {
  const component = shallow(<Sidebar />);

  expect(component.find(Link)).toHaveLength(3);

  window.matchMedia.setMatches(true);
  component.update();

  expect(component.find(Link)).toHaveLength(0);
});

describe('when browser is desktop', () => {
  it('displays the sidebar by default when not on a mobile browser', () => {
    const component = shallow(<Sidebar />);

    const links = component.find(Link);

    expect(links).toHaveLength(3);
    expect(links.at(0)).toHaveProp('to', 'root');
    expect(links.at(0)).toContainReact(<h2>{'FOCUS'}</h2>);
  });

  it('hides the sidebar when toggle is clicked', () => {
    const component = shallow(<Sidebar />);
    const preventDefault = jest.fn();

    component.find('.sidebar__toggle').simulate('click', {preventDefault});

    expect(preventDefault).toHaveBeenCalled();
    expect(component.find(Link)).not.toExist();
  });

  it('does not hide the sidebar after a link is clicked', () => {
    const component = shallow(<Sidebar />);

    component.find(Link).at(0).prop('onNavigate')();
    component.update();

    expect(component.find(Link)).toHaveLength(3);
  });
});

describe('when browser is mobile', () => {
  beforeEach(() => {
    window.matchMedia.setMatches(true);
  });

  it('hides the sidebar by default', () => {
    const component = shallow(<Sidebar />);

    expect(component.find(Link)).not.toExist();
  });

  it('displays the sidebar when toggle is clicked', () => {
    const component = shallow(<Sidebar />);
    const preventDefault = jest.fn();

    component.find('.sidebar__toggle').simulate('click', {preventDefault});

    const links = component.find(Link);

    expect(preventDefault).toHaveBeenCalled();
    expect(links).toHaveLength(3);
    expect(links.at(0)).toHaveProp('to', 'root');
  });

  it('hides the sidebar after a link is clicked', () => {
    const component = shallow(<Sidebar />);
    const preventDefault = jest.fn();

    component.find('.sidebar__toggle').simulate('click', {preventDefault});

    component.find(Link).at(0).prop('onNavigate')();
    component.update();

    expect(component.find(Link)).not.toExist();
  });
});
