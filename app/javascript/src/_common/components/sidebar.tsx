import autobind from 'class-autobind';
import React from 'react';

import {assert} from 'src/_helpers/assert';

type Props = {};

type State = {
  visible: boolean;
};

type LocalState = {
  visible: boolean;
};

class Sidebar extends React.Component<Props, State> {
  mediaQueryList: any;

  constructor(props: {}) {
    super(props);

    autobind(this);

    this.state = {visible: false};
  }

  UNSAFE_componentWillMount() {
    this.mediaQueryList = window.matchMedia('(max-width: 600px)');
    this.mediaQueryList.addListener(this.updateScreenSize);
    this.updateScreenSize();
  }

  updateScreenSize() {
    const visible = !this.mediaQueryList.matches;
    this.toggleSidebarClass(visible);

    this.setState({visible});
  }

  toggleSidebarClass(visible: boolean) {
    const contentDiv = assert(document.querySelector('.content'));
    contentDiv.classList.toggle('sidebar-open', visible);
  }

  toggleVisible(event: React.SyntheticEvent) {
    event.preventDefault();
    this.setState((state: LocalState) => {
      const visible = !state.visible;

      this.toggleSidebarClass(visible);

      return {visible};
    });
  }

  sidebarToggle() {
    const {visible} = this.state;

    const modifier = visible ? 'visible' : 'hidden';
    const className = `sidebar__toggle sidebar__toggle--${modifier}`;
    return (
      <button onClick={this.toggleVisible} className={className}>
        <i className='fas fa-bars' />
      </button>
    );
  }

  render() {
    const {visible} = this.state;

    if (!visible) {
      return (
        <div className='sidebar sidebar--hidden'>
          {this.sidebarToggle()}
        </div>
      );
    }

    const links = [
      {path: '/', text: 'FOCUS'},
      {path: '/tasks', text: 'ALL TASKS'},
      {path: '/timeframes', text: 'TIMEFRAMES'},
    ];

    return (
      <div className='sidebar sidebar--visible'>
        <h2 className='sidebar__header'>{'Menu'}{this.sidebarToggle()}</h2>
        <hr className='sidebar__divider' />
        {
          links.map(link => {
            let className = 'sidebar__link';

            if (window.location.pathname === link.path) {
              className = `${className} ${className}--active`;
            }

            return (
              <a href={link.path} className={className} key={link.path}>
                <h2>{link.text}</h2>
              </a>
            );
          })
        }
      </div>
    );
  }
}

export default Sidebar;
