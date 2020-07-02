import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Example from './Example';
import actions from '../../redux/actions';

const mapState = state => ({ count: state.example.count });

const mapDispatch = dispatch => ({
  addCount: bindActionCreators(actions.addCountAction, dispatch),
  minusCount: bindActionCreators(actions.minusCountAction, dispatch),
  fetchCount: bindActionCreators(actions.fetchCountAction, dispatch),
});

export default connect(mapState, mapDispatch)(Example);
