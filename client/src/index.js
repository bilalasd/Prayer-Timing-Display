import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/react-circular-progressbar/dist/styles.css'
import 'typeface-roboto'
import './index.css'

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<App />, document.querySelector('#root'));
registerServiceWorker();
