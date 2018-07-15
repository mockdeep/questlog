import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import update from 'immutability-helper';
import {uniqWith, isEqual} from 'lodash';

import Link from 'src/route/containers/link';
import RuleRow from 'src/tag/components/rule_row';
import {scratchShape, tagShape} from 'src/shapes';

class TagEditView extends React.Component<any, any> {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({rules: (props.tag && props.tag.rules) || []});
  }

  componentWillReceiveProps(newProps) {
    const {tag, updateScratch} = this.props;

    if (newProps.tag !== tag) {
      updateScratch({rules: newProps.tag.rules});
    }
  }

  updateFieldValue(index, value) {
    const {scratch, updateScratch} = this.props;
    const rules = update(scratch.rules, {[index]: {$merge: {field: value}}});

    updateScratch({rules});
  }

  deleteRule(index) {
    const {scratch, updateScratch} = this.props;

    updateScratch({rules: update(scratch.rules, {$splice: [[index, 1]]})});
  }

  ruleRow(rule, index) {
    const key = Object.values(rule).concat(index).join('-');

    return (
      <RuleRow
        key={key}
        rule={rule}
        index={index}
        deleteRule={this.deleteRule}
        updateFieldValue={this.updateFieldValue}
      />
    );
  }

  ruleRows() {
    const {scratch} = this.props;

    return scratch.rules.map((rule, index) => this.ruleRow(rule, index));
  }

  uniqRules() {
    const {scratch} = this.props;

    return uniqWith(scratch.rules, isEqual);
  }

  hasDuplicateRules() {
    const {scratch} = this.props;

    return this.uniqRules().length !== scratch.rules.length;
  }

  validateAndSave(event) {
    event.preventDefault();

    const {scratch, updateScratch} = this.props;

    if (this.hasDuplicateRules()) {
      // eslint-disable-next-line no-alert
      if (!confirm('There are duplicate rules. Remove extras?')) { return; }

      const uniqRules = this.uniqRules();

      updateScratch({rules: uniqRules});
      this.saveTag(uniqRules);
    } else {
      this.saveTag(scratch.rules);
    }
  }

  saveTag(rules) {
    const {setRoute, tag, updateTag} = this.props;

    updateTag(tag.id, {rules}).
      then(() => setRoute({name: 'tags'}));
  }

  addRule() {
    const {scratch, updateScratch} = this.props;
    const newRule = {field: 'estimateSeconds', check: 'isBlank'};

    updateScratch({rules: scratch.rules.concat(newRule)});
  }

  render() {
    const {scratch, tag} = this.props;

    if (!tag || !scratch.rules) { return null; }

    return (
      <div>
        {`Editing tag ${tag.name}`}
        <br />
        <Link to='tags'>{'Back to tags list'}</Link>
        <h2>{'Rules'}</h2>
        {
          `Tag will include all tasks that match one or more of the following
            rules:`
        }
        <form onSubmit={this.validateAndSave}>
          <ol>{this.ruleRows()}</ol>
          <input
            type='button'
            className='btn btn-primary btn-small'
            value='Add Rule'
            onClick={this.addRule}
          />
          <input
            type='submit'
            className='btn btn-success btn-block'
            value='Save Tag'
          />
        </form>
      </div>
    );
  }
}

TagEditView.propTypes = {
  scratch: scratchShape.isRequired,
  setRoute: PropTypes.func.isRequired,
  updateTag: PropTypes.func.isRequired,
  tag: tagShape,
  updateScratch: PropTypes.func,
};

export default TagEditView;
