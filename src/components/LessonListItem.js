import React from 'react';
import LessonService from "../services/LessonService";

export default class LessonListItem
    extends React.Component {
    constructor(props) {
        console.log("lessonListItemConstructor");
        console.log(props);
        super(props);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.lessonService = LessonService.instance;
    }

    deleteLesson(event) {
        var input = window.confirm("Are you sure?");
        if (input === true) {
            this.lessonService
                .deleteLesson(event.target.id.replace("deleteLesson", "")).then(this.props.reRender);
        }
    }

    render() {
        console.log("renderingLessonsLessonListItem");
        console.log(this.props);
        var self = this;
        return (
            <li className="nav-item nav-link bg-primary">
                {this.props.lesson.title}
                <button id={"deleteLesson" + this.props.lesson.id} className="lessonInto" onClick={self.deleteLesson}>x</button>
            </li>
        )
    }
}
