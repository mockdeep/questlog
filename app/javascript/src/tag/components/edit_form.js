import PropTypes from 'prop-types';
import React from 'react';

import Link from 'src/_common/containers/link';

class EditTagForm extends React.Component {
  ruleRow(rule) {
    const key = Object.values(rule).join('-');

    return <li key={key}>{`${rule.field} ${rule.check}`}</li>;
  }

  render() {
    if (!this.props.tag) { return null; }

    return (
      <div>
        {`Editing tag ${this.props.tag.name}`}
        <br />
        <Link to='tags'>{'Back to tags list'}</Link>
        <h2>{'Rules'}</h2>
        <ol>
          {this.props.tag.rules.map(this.ruleRow)}
        </ol>
      </div>
    );
  }
}

EditTagForm.propTypes = {tag: PropTypes.object};

export default EditTagForm;
