import autobind from 'class-autobind';
import type {ReactElement} from 'react';
import React from 'react';

import TagButton from 'src/tag/components/button';

export type Props = {
  currentTagIds: number[],
  tags: Tag[],
  selectedTagSlug?: string,
};

class TagButtons extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  isCurrent(tag: Tag): boolean {
    const {currentTagIds} = this.props;

    return currentTagIds.includes(tag.id);
  }

  isActive(tag: Tag): boolean {
    const {selectedTagSlug} = this.props;

    if (selectedTagSlug) { return tag.slug === selectedTagSlug; }

    return tag.name === 'All';
  }

  tagButtons(): ReactElement[] {
    const {tags} = this.props;

    return tags.map(this.tagButton);
  }

  tagButton(tag: Tag): ReactElement {
    return (
      <TagButton
        tag={tag}
        key={tag.id}
        current={this.isCurrent(tag)}
        isActive={this.isActive(tag)}
      />
    );
  }

  render(): ReactElement {
    return (
      <div className='row'>
        <div className='col-md-12 tag-buttons'>{this.tagButtons()}</div>
      </div>
    );
  }
}

export default TagButtons;
