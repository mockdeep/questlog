import autobind from 'class-autobind';
import type {ChangeEvent, MouseEvent, ReactElement} from 'react';
import React from 'react';

import grab from 'src/_helpers/grab';

const FIELD_NAMES = ['estimateSeconds', 'tagIds'];

const FIELD_DISPLAY_NAMES = {
  estimateSeconds: 'Estimate Seconds',
  tagIds: 'Tags',
};

const AVAILABLE_CHECKS: { [key: string]: string[] } = {
  estimateSeconds: ['isBlank'],
  tagIds: ['isEmpty'],
};

const CHECK_DISPLAY_NAMES = {
  isBlank: 'is blank',
  isEmpty: 'is empty',
};

type Props = {
  deleteRule: (index: number) => void,
  index: number,
  rule: TagRule,
  updateFieldValue: (index: number, value: TagRuleField) => void,
};

class RuleRow extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
    autobind(this);
  }

  updateFieldValue(event: ChangeEvent<HTMLSelectElement>): void {
    const {index, updateFieldValue} = this.props;
    const {value} = event.target;

    if (value === 'estimateSeconds' || value === 'tagIds') {
      updateFieldValue(index, value);
    } else {
      throw new Error(`unknown rule field: ${value}`);
    }
  }

  fieldOptions(): ReactElement[] {
    return FIELD_NAMES.map(fieldName => (
      <option value={fieldName} key={fieldName}>
        {grab(FIELD_DISPLAY_NAMES, fieldName)}
      </option>
    ));
  }

  checksDropdown(): ReactElement | null {
    const {rule} = this.props;

    if (!rule.field) { return null; }

    const checks = AVAILABLE_CHECKS[rule.field];
    const defaultValue = checks.includes(rule.check) ? rule.check : checks[0];

    return (
      <select name={'tag[rules][][check]'} defaultValue={defaultValue}>
        {
          checks.map(check => (
            <option value={check} key={check}>
              {grab(CHECK_DISPLAY_NAMES, check)}
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

  render(): ReactElement {
    // value = SELECTED_CHECK || FIRST_CHECK_COMPATIBLE_WITH_FIELD;
    // <dropdown enabled={isPreviousDropdownSelected}>{value}</dropdown>
    // {needsValue ? <dropdown>{AVAILABLE_VALUES}</dropdown> : null}
    const {rule} = this.props;

    return (
      <li>
        <select
          name={'tag[rules][][field]'}
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
