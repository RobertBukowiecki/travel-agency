import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';


const sendOrder = (options, tripCost, id, name, country) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripName: name,
    tripId: id,
    countryId: country.alpha3Code,
  };
  if(options.name == '' && options.contact == ''){
    alert('Please complete name and contact form');
  }
  else if(options.name == ''){
    alert('Please complete name form');
  }
  else if(options.contact == ''){
    alert('Please complete contact form');
  }
  else {
    const url = settings.db.url + '/' + settings.db.endpoint.orders;
    console.log('log', country);

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
};


const OrderForm = (props) => {
  const { tripCost, options, setOrderOption, id, name, country } = props;
  return (
    <Row>
      {pricing.map(option => (
        <Col md={4} key={option.id}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} setOrderOption={setOrderOption}/>
      </Col>
      <Button onClick={() => sendOrder(options, tripCost, id, name, country)}>Order now!</Button>
    </Row>
  );
};
OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  country: PropTypes.object,
};
export default OrderForm;
