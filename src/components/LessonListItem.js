import React from 'react';
import LessonService from "../services/LessonService";

export default class LessonListItem
    extends React.Component {
    constructor(props) {
        console.log("lessonListItemConstructor");
        console.log(props);
        super(props);
        this.state = {
            lessonId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        };

        this.lessonService = LessonService.instance;
        this.renderListOfLessons = this.renderListOfLessons.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.abc = this.abc.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

    }

    componentWillReceiveProps(newProps) {
        console.log("newProps");
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setLessons(lessons) {
        console.log("settingModules");
        this.setState({lessons: lessons})
    }

    findAllLessonsForModule(moduleId) {
        console.log("findAllLessonsForModule");
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then(this.setLessons);
    }

    componentDidMount() {
        console.log("inside did mount");
        this.setModuleId(this.props.moduleId);
        console.log("mountedModuleList");
    }

    abc() {
        this.findAllLessonsForModule(this.state.moduleId)
    }

    setLessonId(lessonId) {
        // this.setState({lessonId: lessonId});
        this.state = {
            lessonId: lessonId,
            moduleId: this.state.moduleId,
            lesson: this.state.lesson,
            lessons: this.state.lessons
        };
    }

    deleteLesson(event) {
        var input = window.confirm("Are you sure?");
        if (input === true) {
            this.lessonService
                .deleteLesson(event.target.id.replace("deleteLesson", "")).then(this.abc);
        }
    }

    renderListOfLessons() {
        console.log("renderingLessonsList");
        console.log(this.state);
        var self = this;

        let lessons = this.state.lessons.map((lesson) => {
            console.log("returningLessons");
            this.setLessonId(lesson.id);
            return (
                <li className="nav-item nav-link bg-primary">
                    {lesson.title}
                    {/*{self.setLessonId(lesson.id)}*/}
                    <button id={"deleteLesson" + lesson.id} className="lessonInto" onClick={self.deleteLesson}>x</button>
                </li>
            );
        });
        console.log(lessons);
        return lessons;
    }

    createLesson() {

        if(this.state.lesson.title === ""){
            this.state = {
                lessonId: this.state.lessonId,
                moduleId: this.state.moduleId,
                lesson: {title: "Untitled Lesson"},
                lessons: this.state.lessons
            };
        }
        console.log("creatingLesson");
        this.lessonService
            .createLesson(this.state.moduleId, this.state.lesson.title).then(this.abc);
    }

    titleChanged(event) {
        console.log("titleChanging");
        this.setState({lesson: {title: event.target.value}});
    }

    render() {
        console.log("renderingLessonsLessonListItem");
        var lessonsJSX =
            <ul className="nav nav-tabs">
                {this.renderListOfLessons()}
            </ul>
        console.log(lessonsJSX);
        return (
            <div className="nav nav-tabs">
                {this.renderListOfLessons()}
                <li className="nav-item nav-link">
                    <td>
                        <input onChange={this.titleChanged}
                               value={this.state.lesson.title}
                               placeholder="Course Title"
                               className="form-control"/>
                    </td>
                    <td>
                        <button onClick={this.createLesson}>+</button>
                    </td>
                </li>
            </div>);
    }
}
