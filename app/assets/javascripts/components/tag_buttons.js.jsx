/** @jsx React.DOM */

(function () {

  'use strict';

  Questlog.TagButtons = React.createClass({
    getInitialState: function () {
      return {tags: []};
    },
    componentDidMount: function () {
      Questlog.request({
        method: 'get',
        url: '/tags',
        success: this.updateTags
      });
    },
    updateTags: function (data) {
      this.setState({tags: data.tags});
    },
    isCurrent: function (tag) {
      return _.any(this.currentIds(), function (id) { return tag.id === id });
    },
    tagButtons: function () {
      return _.map(this.state.tags, this.tagButton);
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
          {this.tagButtons()}
        </div>
      );
    }
  });

})();
