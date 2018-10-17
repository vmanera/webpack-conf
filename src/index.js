import "./styles/global.scss";

// import _ from 'lodash';

// # Webpack dynamic imports: code splitting sample # 
function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
        var element = document.createElement('div');

        element.innerHTML = _.join(['codesplit', 'functioning'], ' ');
        return element;
    }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
    document.body.appendChild(component);
});

// # React implementation example # 
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
