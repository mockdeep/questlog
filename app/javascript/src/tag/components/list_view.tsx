import autobind from 'class-autobind';
import React from 'react';

type Props = {
  tags: Tag[];
};

class TagListView extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  tagRow(tag: Tag) {
    if (tag.name === 'All') { return null; }
    const path = `/tags/${tag.slug}/edit`;

    return (
      <div className='tag-row' key={tag.name}>
        {tag.name}
        <a href={path} className='edit-button'>{'Edit'}</a>
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

export default TagListView;
