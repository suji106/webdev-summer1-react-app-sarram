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
                this.setState({courses: courses,
                course: {title:'Untitled Course'}});
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
                                      course={course} callback={self.findAllCourses}/>
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

        this.setState({
            course: {title: ''}
        });

        this.state.course.title = '';
        console.log(this.state.course);
        this.render();
    }

    render() {
        console.log("renderingCoursesList");

        return (
            <div>
                <div id="courseHeading">
                    <td id="courseManager">Course Manager</td>
                    <td id="courseInput">
                        <input onChange={this.titleChanged}
                               className="form-control" id="titleFld"
                               placeholder="New Course Title"/>
                    </td>
                    <td id={"addCourseButton"}>
                        <button onClick={this.createCourse}
                                className="btn btn-primary">
                            Add
                        </button>
                    </td>
                </div>
                <table className="table">
                    <tr id="courseListHeader">
                        <td>
                            Title
                        </td>
                        <td id="ownedBy">
                            Owned By
                        </td>
                        <td id="lastModified">
                            Last Modified by me
                        </td>
                    </tr>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CourseList;
