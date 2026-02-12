import autobind from "class-autobind";
import type {SyntheticEvent, ReactElement} from "react";
import React from "react";
import update from "immutability-helper";
import {uniqWith, isEqual} from "lodash";

import AuthenticityToken from "src/_common/components/authenticity_token";
import RuleRow from "src/tag/components/rule_row";

export type Props = {
  tag: Tag | undefined;
};

type State = {
  rules: TagRule[]
};

class TagEditView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    autobind(this);
    this.state = {
      rules: (props.tag && props.tag.rules) ?? [],
    };
  }

  UNSAFE_componentWillReceiveProps({tag: newTag}: Props): void {
    const {tag} = this.props;

    if (!newTag || tag === newTag) { return; }

    this.setState({rules: newTag.rules});
  }

  updateFieldValue(index: number, value: TagRuleField): void {
    this.setState(state => {
      const rules = update(state.rules, {[index]: {$merge: {field: value}}});
      return {rules};
    });
  }

  deleteRule(index: number): void {
    this.setState(state => {
      const rules = update(state.rules, {$splice: [[index, 1]]});

      return {rules};
    });
  }

  ruleRow(rule: TagRule, index: number): ReactElement {
    const keyParts: string[] = Object.values(rule);
    keyParts.push(index.toString());
    const key: string = keyParts.join("-");

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

  ruleRows(): ReactElement[] {
    const {rules} = this.state;

    return rules.map((rule, index) => this.ruleRow(rule, index));
  }

  uniqRules() {
    const {rules} = this.state;

    return uniqWith(rules, isEqual);
  }

  hasDuplicateRules(): boolean {
    const {rules} = this.state;

    return this.uniqRules().length !== rules.length;
  }

  validateAndSave(event: SyntheticEvent): void {
    if (this.hasDuplicateRules()) {
      // eslint-disable-next-line no-alert
      if (!confirm("There are duplicate rules. Remove extras?")) {
        event.preventDefault();
        return;
      }

      const uniqRules = this.uniqRules();

      this.setState({rules: uniqRules});
    }
  }

  addRule(): void {
    const {rules} = this.state;
    const newRule: TagRule = {field: "estimateSeconds", check: "isBlank"};

    this.setState({rules: rules.concat(newRule)});
  }

  render(): ReactElement | null {
    const {tag} = this.props;

    if (!tag) { return null; }

    const path = `/tags/${tag.id}`;

    return (
      <div>
        {`Editing tag ${tag.name}`}
        <br />
        <a href='/tags'>{"Back to tags list"}</a>
        <h2>{"Rules"}</h2>
        {
          `Tag will include all tasks that match one or more of the following
            rules:`
        }
        <form action={path} method='post' onSubmit={this.validateAndSave}>
          <input
            type='hidden'
            name='_method'
            value='patch'
            autoComplete='off'
          />
          <AuthenticityToken />
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

export default TagEditView;
