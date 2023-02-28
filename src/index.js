
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css';
import './Style/header.css';
import './Style/dashboard.css';
import './Style/swapcurrency.css';
import './Style/new-style.css';
import './Style/p2p.css';
import './Style/profile.css';
import './Style/chart.css';
import './Style/transferModel.css';
import './Style/tradeLeft.css';
import './Style/home.css';
import './components/popup/popup.css';
import './Style/about.css';
import './Style/footer.css';
import App from "./App"
import { BrowserRouter } from 'react-router-dom';
import configureStore from './Store';
import CryptoContext from './CryptoContext'
let { store, persistor } = configureStore();

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CryptoContext>
          <App />
        </CryptoContext>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
