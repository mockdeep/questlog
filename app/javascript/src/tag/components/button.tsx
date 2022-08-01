import autobind from 'class-autobind';
import classnames from 'classnames';
import type {ReactElement} from 'react';
import React from 'react';

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

  className(): string {
    const {current, isActive, tag} = this.props;

    return classnames({
      'button btn btn-default': true,
      active: isActive,
      current,
      [`priority-${tag.priority}-btn`]: tag.priority,
    });
  }

  render(): ReactElement {
    const {tag} = this.props;
    const {slug, name} = tag;
    const path = name === 'All' ? '/' : `/tags/${slug}`;

    return (
      <div>
        <a href={path} className={this.className()}>
          {`${name} (${tag.tasks.length})`}
        </a>
      </div>
    );
  }
}

export default TagButton;
