import autobind from 'class-autobind';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
};

class Link extends React.Component<Props, any> {
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

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  routeName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  baseClass: PropTypes.string,
  className: PropTypes.string,
  onNavigate: PropTypes.func,
  params: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Link;
