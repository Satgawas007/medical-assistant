import React from 'react'
import Nav from './Menu/Nav'
//import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// import the two exports from the last code snippet.
import { persistor, store } from './Redux/store';

const App = () => {
  
  return (
    <Provider store={store}>      
      <PersistGate loading={null} persistor={persistor}>
        <Nav />
      </PersistGate>
    </Provider>
  );
};

export default App;
