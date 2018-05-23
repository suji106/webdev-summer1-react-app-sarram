import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        console.log("courseListConstructor");
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.findAllCourses = this.findAllCourses.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        console.log("findingAllCourses")
        console.log(this);


        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log(courses);
                this.setState({courses: courses});
            })
    }

    renderCourseRows() {
        let courses = null;
        let self = this;
        console.log("renderCourseRows")
        console.log(this.state)
        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course} callback = {self.findAllCourses}/>
                }
            )
        }
        return (
            courses
        )
    }

    titleChanged(event) {
        console.log("titleChange");
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    render() {
        console.log("renderingCoursesList");
        return (
            <div>
                <table className="table">
                    <thead>
                    <tr id="courseHeading">
                        <th id="courseManager">Course Manager</th>
                        <th><input onChange={this.titleChanged}
                                   className="form-control" id="titleFld"
                                   placeholder="CS5000"/></th>
                        <th>
                            <button onClick={this.createCourse}
                                    className="btn btn-primary">
                                Add
                            </button>
                        </th>
                    </tr>
                    <tr id="courseListHeader">
                        <td>
                            Title
                        </td>
                        <td>
                            Owned By
                        </td>
                        <td>
                            Last Modified by me
                        </td>
                        <Router>
                            <td id="sortRows">
                                <Link to={`/courses`} className="fa fa fa-sort-alpha-asc">
                                </Link>
                            </td>
                        </Router>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;
