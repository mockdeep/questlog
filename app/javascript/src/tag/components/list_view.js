import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/route/containers/link';
import {tagShape} from 'src/shapes';

class TagListView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  tagRow(tag) {
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
    return (
      <div>
        {this.props.tags.map(this.tagRow)}
      </div>
    );
  }
}

TagListView.propTypes = {tags: PropTypes.arrayOf(tagShape).isRequired};

export default TagListView;
