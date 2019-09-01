import React from 'react';
import {shallow} from 'enzyme';

import {setMatches} from '_test_helpers/match_media';
import Sidebar from 'src/_common/components/sidebar';

beforeEach(() => {
  document.body.innerHTML = '<div class="content"></div>';
});

it('updates the mobile status when screen size changes', () => {
  const component = shallow(<Sidebar />);

  expect(component.find('a')).toHaveLength(3);

  setMatches(true);
  component.update();

  expect(component.find('a')).toHaveLength(0);
});

describe('when browser is desktop', () => {
  it('displays the sidebar by default', () => {
    const component = shallow(<Sidebar />);

    const links = component.find('a');

    expect(links).toHaveLength(3);
    expect(links.at(0)).toHaveProp('href', '/');
    expect(links.at(0)).toContainReact(<h2>{'FOCUS'}</h2>);
  });

  it('hides the sidebar when toggle is clicked', () => {
    const component = shallow(<Sidebar />);
    const preventDefault = jest.fn();

    component.find('.sidebar__toggle').simulate('click', {preventDefault});

    expect(preventDefault).toHaveBeenCalled();
    expect(component.find('a')).not.toExist();
  });
});

describe('when browser is mobile', () => {
  beforeEach(() => {
    setMatches(true);
  });

  it('hides the sidebar by default', () => {
    const component = shallow(<Sidebar />);

    expect(component.find('a')).not.toExist();
  });

  it('displays the sidebar when toggle is clicked', () => {
    const component = shallow(<Sidebar />);
    const preventDefault = jest.fn();

    component.find('.sidebar__toggle').simulate('click', {preventDefault});

    const links = component.find('a');

    expect(preventDefault).toHaveBeenCalled();
    expect(links).toHaveLength(3);
    expect(links.at(0)).toHaveProp('href', '/');
  });
});
