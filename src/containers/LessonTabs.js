import React from 'react'
import LessonListItem from "../components/LessonListItem";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        console.log(props);
        console.log("lessonTabsConstructor");
        super();
    }

    render() {
        console.log("lessonTabs");
        console.log(this.props.match.params.courseId);
        console.log(this.props.match.params.moduleId);

        return (
            <div className="nav nav-tabs">
                <LessonListItem moduleId={this.props.match.params.moduleId}/>
            </div>
        );
    }
}
