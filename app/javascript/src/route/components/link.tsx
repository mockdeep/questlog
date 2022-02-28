import autobind from 'class-autobind';
import classnames from 'classnames';
import React from 'react';
import {mapValues} from 'lodash';

import {findRoute} from 'src/route/helpers';

type Props = {
  baseClass?: string;
  className?: string;
  onNavigate?: Function;
  params?: {[key: string]: string | number};
  routeName: string;
  to: string;
  children: any;
};

class Link extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  path() {
    const {params, to} = this.props;
    const pathParams = mapValues(params, value => value.toString());

    return findRoute(to).toPath(pathParams);
  }

  className() {
    const {baseClass, className, to, routeName} = this.props;

    return classnames(
      baseClass,
      {[`${baseClass}--active`]: baseClass && routeName === to},
      className,
    );
  }

  render() {
    const {children} = this.props;

    return (
      <a href={this.path()} className={this.className()}>
        {children}
      </a>
    );
  }
}

export default Link;
