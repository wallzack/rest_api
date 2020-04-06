import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeats, loadSeatsRequest } from '../../../redux/seatsRedux';
import SeatChooser from './SeatChooser';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadSeatsFromServer: (seats) => dispatch(loadSeats(seats)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);