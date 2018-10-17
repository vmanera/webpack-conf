import "./styles/global.scss";

// import $ from "jquery";

// import _ from 'lodash';

//code splitting sample
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
