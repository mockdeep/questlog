import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';
import {tagShape} from 'src/shapes';

type Props = {
  tags: Tag[];
};

class TagListView extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  tagRow(tag: Tag) {
    if (tag.name === 'All') { return null; }

    return (
      <div className='tag-row' key={tag.name}>
        {tag.name}
        <Link to='editTag' params={{slug: tag.slug}} className='edit-button'>
          {'Edit'}
        </Link>
      </div>
    );
  }

  render() {
    const {tags} = this.props;

    return (
      <div>{tags.map(this.tagRow)}</div>
    );
  }
}

TagListView.propTypes = {tags: PropTypes.arrayOf(tagShape).isRequired};

export default TagListView;
