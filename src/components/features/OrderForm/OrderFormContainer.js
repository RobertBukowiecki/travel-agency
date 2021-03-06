import {connect} from 'react-redux';
import { getOrderOptions, setOrderOption } from '../../../redux/orderRedux';
import OrderForm from '../OrderForm/OrderForm';

const mapStateToProps = (state) => ({
  options: getOrderOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  setOrderOption: payload => dispatch(setOrderOption(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
