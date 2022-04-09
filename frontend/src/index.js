import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import configureStore from './redux/store';
import App from './pages/App';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export const store = configureStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);