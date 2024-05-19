import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './Index.css';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

disableReactDevTools();
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
