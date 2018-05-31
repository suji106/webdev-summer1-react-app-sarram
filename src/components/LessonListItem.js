import React from 'react';
import LessonService from "../services/LessonService";
import {Link} from 'react-router-dom'

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
            <li className="nav-item nav-link bg-primary" id="lesson-tab">
                <Link to={`/lesson/${this.props.lesson.id}`} id="lesson-link">
                    {this.props.lesson.title}
                </Link>
                <button id={"deleteLesson" + this.props.lesson.id} onClick={self.deleteLesson}
                        className="lesson-del glyphicon glyphicon-plus">
                    <span aria-hidden="true">
                        &times;
                    </span>
                </button>
            </li>
        )
    }
}
