// AppContainer.js
import { connect } from 'react-redux';
import { activateGeod, closeGeod } from './actions/actions';

const mapStateToProps = state => ({
  geod: state.geod,
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;