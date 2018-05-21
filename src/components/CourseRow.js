import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CourseService from "../services/CourseService";
import ModuleList from "../containers/ModuleList";
import CourseList from "../containers/CourseList";

class CourseRow extends React.Component {
    constructor(props) {
        console.log("cons");
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.courseService = CourseService.instance;
    }

    deleteCourse() {
        this.courseService
            .deleteCourse(this.props.course.id);
        console.log("ffffffffffffffffffffffff");
        var route = 'courses';
        return(
            <Route path={route} component={CourseList}/>
        );
    }

    reRoute(courseId) {
        console.log("reRouting");
        var route = 'course' + courseId;
        return(
            <Route path={route} component={ModuleList}/>
        );
    }

    render() {
        console.log("renderingCourseRow");

        return (
            <Router>
                <tr>
                    <td>
                        <Link to={`/course/${this.props.course.id}`} onClick={this.reRoute(this.props.course.id)}>
                            {this.props.course.title}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/courses1`}
                              className="btn btn-danger" onClick={this.deleteCourse}>
                            Delete
                        </Link>

                    </td>
                </tr>
            </Router>
        )
    }
}

export default CourseRow;
