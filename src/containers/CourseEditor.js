import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'

export default class itor
    extends React.Component {

    constructor(props) {
        console.log(props);
        super(props)
        this.state = {courseId: ''};
        this.selectCourse = this.selectCourse.bind(this);
    }

    componentDidMount() {
        console.log("mountEditor");
        this.selectCourse(this.props.match.params.courseId);
    }

    selectCourse(courseId) {
        console.log("selectingCourses");
        this.setState({courseId: courseId});
    }

    render() {
        console.log("renderingCourseEditor");
        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <ModuleList courseId={this.state.courseId}/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                    </div>
                </div>
            </div>
        );
    }
}
