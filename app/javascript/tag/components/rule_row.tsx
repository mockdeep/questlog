import autobind from "class-autobind";
import {Component} from "react";
import type {ChangeEvent, MouseEvent, ReactElement} from "react";

import {ensure} from "helpers/ensure";
import {grab} from "helpers/grab";

type Props = {
  deleteRule: (index: number) => void,
  index: number,
  rule: TagRule,
  ruleFields: TagRuleFieldOption[],
  updateFieldValue: (index: number, value: TagRuleField) => void,
};

class RuleRow extends Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  updateFieldValue(event: ChangeEvent<HTMLSelectElement>): void {
    const {index, ruleFields, updateFieldValue} = this.props;
    const {value} = event.target;
    const field = ruleFields.find(ruleField => ruleField.name === value);

    if (!field) { throw new Error(`unknown rule field: ${value}`); }

    updateFieldValue(index, field.name);
  }

  fieldOptions(): ReactElement[] {
    const {ruleFields} = this.props;

    return ruleFields.map(field => (
      <option value={field.name} key={field.name}>
        {field.label}
      </option>
    ));
  }

  availableChecks(): TagRuleCheckOption[] {
    const {rule, ruleFields} = this.props;
    const field = ruleFields.find(({name}) => name === rule.field);

    return ensure(field).checks;
  }

  checksDropdown(): ReactElement | null {
    const {rule} = this.props;

    if (!rule.field) { return null; }

    const checks = this.availableChecks();
    const selected = checks.some(({name}) => name === rule.check);
    const defaultValue = selected ? rule.check : grab(checks, 0).name;

    return (
      <select name={"tag[rules][][check]"} defaultValue={defaultValue}>
        {
          checks.map(check => (
            <option value={check.name} key={check.name}>
              {check.label}
            </option>
          ))
        }
      </select>
    );
  }

  deleteRule(event: MouseEvent): void {
    event.preventDefault();

    const {deleteRule, index} = this.props;

    deleteRule(index);
  }

  override render(): ReactElement {
    // value = SELECTED_CHECK || FIRST_CHECK_COMPATIBLE_WITH_FIELD;
    // <dropdown enabled={isPreviousDropdownSelected}>{value}</dropdown>
    // {needsValue ? <dropdown>{AVAILABLE_VALUES}</dropdown> : null}
    const {rule} = this.props;

    return (
      <li data-tag-rules-target='rule'>
        <select
          name={"tag[rules][][field]"}
          defaultValue={rule.field}
          onChange={this.updateFieldValue}
        >
          {this.fieldOptions()}
        </select>
        {this.checksDropdown()}

        <i className='fas fa-times' onClick={this.deleteRule} />
      </li>
    );
  }
}

export default RuleRow;
