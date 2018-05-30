import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import CourseManager from './containers/CourseManager';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './index.css'
import {WidgetReducer} from "./reducers/WidgetReducer"
import {createStore} from 'redux'

let store = createStore(WidgetReducer)

ReactDOM.render(
    <Provider store={store}>
        <CourseManager/>
    </Provider>,
    document.getElementById('root')
);