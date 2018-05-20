import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './hello'
import CourseManager from './containers/CourseManager'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

import Hello from './components/Hello'
import Stateless from './components/Stateless'
import ModuleListItem from "./components/ModuleListItem"
import CourseRow from './components/CourseRow'
import CourseCard from './components/CourseCard'

import ModuleList2 from "./containers/ModuleList2"
import LessonTabs from "./containers/LessonTabs"
import CourseList from "./containers/CourseList"
import CourseEditor from "./containers/CourseEditor"

import App from "./examples/App";


ReactDOM.render(
    <div className="container-fluid">
        <ModuleList2/>
        <LessonTabs/>
        <CourseList/>

        <CourseCard/>
    </div>,
    document.getElementById('root')
);