import React from 'react'
import LessonListItem from "../components/LessonListItem";
import LessonService from "../services/LessonService";

export default class LessonTabs
    extends React.Component {
    constructor(props) {
        console.log(props);
        console.log("lessonTabsConstructor");
        super();
        this.state = {
            lessonId: '',
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        };

        this.lessonService = LessonService.instance;
        this.renderListOfLessons = this.renderListOfLessons.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.reRender = this.reRender.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    componentWillReceiveProps(newProps) {
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

    titleChanged(event) {
        console.log("titleChanging");
        this.setState({lesson: {title: event.target.value}});
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

    reRender() {
        this.findAllLessonsForModule(this.state.moduleId)
    }

    createLesson() {

        if (this.state.lesson.title === "") {
            this.state = {
                lessonId: this.state.lessonId,
                moduleId: this.state.moduleId,
                lesson: {title: "Untitled Lesson"},
                lessons: this.state.lessons
            };
        }
        console.log("creatingLesson");
        this.lessonService
            .createLesson(this.state.moduleId, this.state.lesson.title).then(this.reRender);
    }

    renderListOfLessons() {
        console.log("renderingLessonsList");
        console.log(this.state);

        let lessons = this.state.lessons.map((lesson) => {
            console.log("returningLessons");
            this.setLessonId(lesson.id);
            return (
                <LessonListItem lesson={lesson} state={this.state} reRender={this.reRender}/>
            );
        });
        return lessons;
    }

    render() {
        console.log("lessonTabs");
        return (
            <div className="nav nav-tabs" id="list-of-lessons">
                {this.renderListOfLessons()}
                <ul className="nav-item nav-link">
                    <td>
                        <input onChange={this.titleChanged}
                               value={this.state.lesson.title}
                               placeholder="Course Title"
                               className="form-control"/>
                    </td>
                    <td>
                        <button onClick={this.createLesson}>+</button>
                    </td>
                </ul>
            </div>
        );
    }
}
