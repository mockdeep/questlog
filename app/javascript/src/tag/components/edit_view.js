import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';
import update from 'immutability-helper';
import {uniqWith, isEqual} from 'lodash';

import Link from 'src/route/containers/link';
import RuleRow from 'src/tag/components/rule_row';

class TagEditView extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
    props.updateScratch({rules: (props.tag && props.tag.rules) || []});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tag !== this.props.tag) {
      this.props.updateScratch({rules: newProps.tag.rules});
    }
  }

  updateFieldValue(index, value) {
    this.props.updateScratch({rules: update(this.props.scratch.rules, {[index]: {$merge: {field: value}}})});
  }

  deleteRule(index) {
    this.props.updateScratch({rules: update(this.props.scratch.rules, {$splice: [[index, 1]]})});
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
    return this.props.scratch.rules.map((rule, index) => this.ruleRow(rule, index));
  }

  uniqRules() {
    return uniqWith(this.props.scratch.rules, isEqual);
  }

  hasDuplicateRules() {
    return this.uniqRules().length !== this.props.scratch.rules.length;
  }

  validateAndSave(event) {
    event.preventDefault();

    if (this.hasDuplicateRules()) {
      // eslint-disable-next-line no-alert
      if (!confirm('There are duplicate rules. Remove extras?')) { return; }

      const uniqRules = this.uniqRules();

      this.props.updateScratch({rules: uniqRules});
      this.saveTag(uniqRules);
    } else {
      this.saveTag(this.props.scratch.rules);
    }
  }

  saveTag(rules) {
    this.props.updateTag(this.props.tag.id, {rules}).
      then(() => this.props.setRoute({name: 'tags'}));
  }

  addRule() {
    const newRules = this.props.scratch.rules.concat({field: 'estimateSeconds', check: 'isBlank'});

    this.props.updateScratch({rules: newRules});
  }

  render() {
    if (!this.props.tag || !this.props.scratch.rules) { return null; }

    return (
      <div>
        {`Editing tag ${this.props.tag.name}`}
        <br />
        <Link to='tags'>{'Back to tags list'}</Link>
        <h2>{'Rules'}</h2>
        {'Tag will include all tasks that match one or more of the following rules:'}
        <form onSubmit={this.validateAndSave}>
          <ol>{this.ruleRows()}</ol>
          <input type='button' className='btn btn-primary btn-small' value='Add Rule' onClick={this.addRule} />
          <input type='submit' className='btn btn-success btn-block' value='Save Tag' />
        </form>
      </div>
    );
  }
}

TagEditView.propTypes = {
  scratch: PropTypes.object.isRequired,
  setRoute: PropTypes.func.isRequired,
  tag: PropTypes.object,
  updateScratch: PropTypes.func,
  updateTag: PropTypes.func.isRequired,
};

export default TagEditView;
