import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CourseService from "../services/CourseService";
import ModuleList from "../containers/ModuleList";

class CourseRow extends React.Component {
    constructor(props) {
        console.log("cons");
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.courseService = CourseService.instance;
        console.log(props.callback);
    }

    deleteCourse() {
        var input = window.confirm("Are you sure?");
        if (input === true) {
            this.courseService
                .deleteCourse(this.props.course.id).then(this.props.callback);
        }
    }

    reRoute(courseId) {
        courseId = this.props.course.id;
        console.log("reRouting");
        var route = 'course' + courseId;
        return (
            <Route path={route} component={ModuleList}/>
        );
    }

    getNiceTime(time) {
        console.log("logging time");
        var current_date = new Date();
        console.log(current_date);
        var old_time = new Date(time).toDateString();
        var curr_time = new Date(current_date).toDateString();
        if (old_time !== curr_time) {
            console.log(old_time);
            console.log(curr_time);
            return old_time;
        }
        else {
            return new Date(time).toLocaleTimeString();
        }
    }

    render() {
        console.log("renderingCourseRow");

        return (
            <Router>
                <tr>
                    <td>
                        <div className="fa fa-file-text"></div>
                        <Link to={`/course/${this.props.course.id}`}
                              onClick={this.reRoute} id="courseTitle">
                            {this.props.course.title}
                        </Link>
                    </td>
                    <td className="owned_by">
                        me
                    </td>
                    <td className="last_mod">
                        {this.getNiceTime(this.props.course.modified)}
                    </td>
                    <td id="delete">
                        <div className="btn btn-danger" onClick={this.deleteCourse}>
                            Delete
                        </div>
                    </td>
                </tr>
            </Router>
        )
    }
}

export default CourseRow;
