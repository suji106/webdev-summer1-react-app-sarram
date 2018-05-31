import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList";

export default class CourseManager
    extends Component {
    render() {
        console.log("rendering Course Manager!!");
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/courses"
                           exact component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId"
                           component={CourseEditor}>
                    </Route>
                </div>
            </Router>
        )
    }
}
