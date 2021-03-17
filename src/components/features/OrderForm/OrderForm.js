import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = (props) => {
  const { tripCost, options } = props;
  return (
    <Row>
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} />
      </Col>
    </Row>
  );
};
OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};
export default OrderForm;