import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'

export default class CourseEditor
    extends React.Component {

    constructor(props) {
        // console.log(props);
        super(props)
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        // console.log("mountEditor");
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        // console.log("selectingCourses");
        this.setState({courseId: courseId});
    }

    render() {
        // console.log("renderingCourseEditor");
        console.log(this.state.courseId);
        return (
            <Router>
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
            </Router>
        );
    }
}
