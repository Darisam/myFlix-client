import React from 'react';

import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(event) => props.setFilter(event.target.value)}
      value={props.visibilityFilter}
      placeholder="filter"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
