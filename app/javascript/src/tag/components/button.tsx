import autobind from 'class-autobind';
import classnames from 'classnames';
import React from 'react';

import Link from 'src/route/containers/link';

export type Props = {
  current: boolean,
  isActive: boolean,
  tag: Tag,
};

class TagButton extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  className() {
    const {current, isActive, tag} = this.props;

    return classnames({
      'button btn btn-default': true,
      active: isActive,
      current,
      [`priority-${tag.priority}-btn`]: tag.priority,
    });
  }

  render() {
    const {tag} = this.props;
    const {slug, name} = tag;
    const to = name === 'All' ? 'root' : 'tag';

    return (
      <div>
        <Link to={to} params={{slug}} className={this.className()}>
          {`${name} (${tag.tasks.length})`}
        </Link>
      </div>
    );
  }
}

export default TagButton;
