import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React, {SyntheticEvent} from 'react';
import update from 'immutability-helper';
import {uniqWith, isEqual} from 'lodash';

import Link from 'src/route/containers/link';
import RuleRow from 'src/tag/components/rule_row';
import {tagShape} from 'src/shapes';

export type Props = {
  setRoute: Function,
  updateTag: Function,
  tag: Tag,
};

type State = {
  rules: TagRule[]
};

class TagEditView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {
      rules: (props.tag && props.tag.rules) || [],
    };
  }

  updateFieldValue(index: number, value: string) {
    this.setState(state => {
      const rules = update(state.rules, {[index]: {$merge: {field: value}}});
      return {rules};
    });
  }

  deleteRule(index: number) {
    this.setState(state => {
      const rules = update(state.rules, {$splice: [[index, 1]]});

      return {rules};
    });
  }

  ruleRow(rule: TagRule, index: number) {
    const key: string = Object.values(rule).concat(index.toString()).join('-');

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
    const {rules} = this.state;

    return rules.map((rule, index) => this.ruleRow(rule, index));
  }

  uniqRules() {
    const {rules} = this.state;

    return uniqWith(rules, isEqual);
  }

  hasDuplicateRules() {
    const {rules} = this.state;

    return this.uniqRules().length !== rules.length;
  }

  validateAndSave(event: SyntheticEvent) {
    event.preventDefault();
    const {rules} = this.state;

    if (this.hasDuplicateRules()) {
      // eslint-disable-next-line no-alert
      if (!confirm('There are duplicate rules. Remove extras?')) { return; }

      const uniqRules = this.uniqRules();

      this.setState({rules: uniqRules});
      this.saveTag(uniqRules);
    } else {
      this.saveTag(rules);
    }
  }

  saveTag(rules: TagRule[]) {
    const {setRoute, tag, updateTag} = this.props;

    updateTag(tag.id, {rules}).
      then(() => setRoute({name: 'tags'}));
  }

  addRule() {
    const {rules} = this.state;
    const newRule = {field: 'estimateSeconds', check: 'isBlank'};

    this.setState({rules: rules.concat(newRule)});
  }

  render() {
    const {tag} = this.props;

    if (!tag) { return null; }

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
  setRoute: PropTypes.func.isRequired,
  updateTag: PropTypes.func.isRequired,
  tag: tagShape,
};

export default TagEditView;
