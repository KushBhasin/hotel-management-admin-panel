
// importing react
import React from 'react';
import ReactDOM from 'react-dom/client';

// importing the styling
import './index.css';

// importing the app component
import App from './App';


// getting the rooot div from the webpage, where all the other components wil be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// here we will render the app component
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
);
