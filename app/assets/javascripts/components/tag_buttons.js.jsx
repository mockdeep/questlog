/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TagButtons = React.createClass({
    isCurrent: function (tag) {
      return _.any(this.currentIds(), function (id) { return tag.id === id });
    },
    tagButtons: function () {
      return _.map(this.props.tags, this.tagButton);
    },
    tagButton: function (tag) {
      return (<Questlog.TagButton tag={tag}
                                  key={tag.id}
                                  current={this.isCurrent(tag)} />);
    },
    currentIds: function () {
      return this.props.current_ids;
    },
    render: function () {
      return (
        <div className='tag-buttons'>
          <Questlog.TagButton tag={this.props.user} />
          {this.tagButtons()}
        </div>
      );
    }
  });

})();
