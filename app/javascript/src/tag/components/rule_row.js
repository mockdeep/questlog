import autobind from 'class-autobind';
import PropTypes from 'prop-types';
import React from 'react';

const FIELD_NAMES = ['estimateSeconds', 'tagIds'];

const FIELD_DISPLAY_NAMES = {
  estimateSeconds: 'Estimate Seconds',
  tagIds: 'Tags',
};

const AVAILABLE_CHECKS = {
  estimateSeconds: ['isBlank'],
  tagIds: ['isEmpty'],
};

const CHECK_DISPLAY_NAMES = {
  isBlank: 'is blank',
  isEmpty: 'is empty',
};

class RuleRow extends React.Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  updateFieldValue(event) {
    this.props.updateFieldValue(this.props.index, event.target.value);
  }

  fieldOptions() {
    return FIELD_NAMES.map((fieldName) =>
      <option value={fieldName} key={fieldName}>{FIELD_DISPLAY_NAMES[fieldName]}</option>
    );
  }

  checksDropdown() {
    const {rule} = this.props;

    if (!rule.field) { return null; }

    const checks = AVAILABLE_CHECKS[rule.field];
    const defaultValue = checks.includes(rule.check) ? rule.check : checks[0];

    return (
      <select defaultValue={defaultValue}>
        {checks.map((check) => <option value={check} key={check}>{CHECK_DISPLAY_NAMES[check]}</option>)}
      </select>
    );
  }

  deleteRule(event) {
    event.preventDefault();

    this.props.deleteRule(this.props.index);
  }

  render() {
    // value = SELECTED_CHECK || FIRST_CHECK_COMPATIBLE_WITH_FIELD;
    // <dropdown enabled={isPreviousDropdownSelected}>{value}</dropdown>
    // {needsValue ? <dropdown>{AVAILABLE_VALUES}</dropdown> : null}
    const {rule} = this.props;

    return (
      <li>
        <select defaultValue={rule.field} onChange={this.updateFieldValue}>
          {this.fieldOptions()}
        </select>
        {this.checksDropdown()}

        <i className='fa fa-times' onClick={this.deleteRule} />
      </li>
    );
  }
}

RuleRow.propTypes = {
  deleteRule: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  rule: PropTypes.object.isRequired,
  updateFieldValue: PropTypes.func.isRequired,
};

export default RuleRow;
