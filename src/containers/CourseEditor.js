import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseService from "../services/CourseService";

export default class CourseEditor
    extends React.Component {

    constructor(props) {
        // console.log(props);
        super(props)
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        this.getCourseById = this.getCourseById.bind(this);
        this.routeToManager = this.routeToManager.bind(this);
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        // console.log("mountEditor");
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        // console.log("selectingCourses");
        this.setState({courseId: courseId});
    }

    getCourseById(courseId) {
        // console.log("gettingCourseById");
        // var courseId = this.self.state.courseId;
        var titleCourse = null;
        if (courseId !== "") {
            titleCourse = this.courseService
                .getCourseById(courseId);
            // console.log(title);
        }
        else {
            titleCourse = "No Title Yet";
        }
        // console.log(title);
        return titleCourse;
    }

    routeToManager() {
        window.location.href = '/courses';
    }

    render() {
        // console.log("renderingCourseEditor");
        console.log(this.state.courseId);
        return (
            <Router>
                <div>
                    <div id="courseHeader">
                        <td id="intoButtons" classType="fa fa-close" onClick={this.routeToManager}>
                            <button>X</button>
                        </td>
                        <td id="courseTitle">Module List for Course ID: {this.getCourseById(this.state.courseId)}</td>
                    </div>
                    <div className="row">

                        <div className="col-4">
                            <ModuleList courseId={this.state.courseId}/>
                        </div>
                        <div className="col-8">
                            <Route path="/course/:courseId/:moduleId"
                                   exact component={LessonTabs}>
                            </Route>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
