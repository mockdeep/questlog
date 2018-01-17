import autobind from 'class-autobind';
import React from 'react';

import Link from 'src/route/containers/link';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    autobind(this);

    this.mediaQueryList = window.matchMedia('(max-width: 600px)');
    this.mediaQueryList.addListener(this.updateScreenSize);

    const mobile = this.mediaQueryList.matches;

    this.state = {mobile, visible: !mobile};
  }

  updateScreenSize() {
    const mobile = this.mediaQueryList.matches;

    this.setState({mobile, visible: !mobile});
  }

  toggleVisible(event) {
    event.preventDefault();
    this.setState(state => ({visible: !state.visible}));
  }

  sidebarToggle() {
    const {visible} = this.state;

    const modifier = visible ? 'visible' : 'hidden';
    const className = `sidebar__toggle sidebar__toggle--${modifier}`;
    return (
      <button onClick={this.toggleVisible} className={className}>
        <i className='fa fa-bars' />
      </button>
    );
  }

  hideIfMobile() {
    const {mobile} = this.state;

    if (mobile) { this.setState({visible: false}); }
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

    const linkProps = {
      baseClass: 'sidebar__link',
      onNavigate: this.hideIfMobile,
    };

    return (
      <div className='sidebar sidebar--visible'>
        <h2 className='sidebar__header'>{'Menu'}{this.sidebarToggle()}</h2>
        <hr className='sidebar__divider' />
        <Link to='root' {...linkProps}><h2>{'FOCUS'}</h2></Link>
        <Link to='tasks' {...linkProps}><h2>{'ALL TASKS'}</h2></Link>
        <Link to='timeframes' {...linkProps}><h2>{'TIMEFRAMES'}</h2></Link>
      </div>
    );
  }
}

export default Sidebar;
