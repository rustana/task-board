import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';  // Pick a theme
import 'primereact/resources/primereact.min.css';  // Core styles
import 'primeicons/primeicons.css';  // Icons
import 'primeflex/primeflex.css';  // Grid utilities (optional)

import App from './App';
import reportWebVitals from './reportWebVitals';
import {PrimeReactProvider} from "primereact/api";
import 'primeflex/primeflex.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PrimeReactProvider>
            <App/>
        </PrimeReactProvider>
    </React.StrictMode>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
