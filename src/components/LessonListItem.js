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

    // componentWillReceiveProps(newProps) {
    //     console.log("inside will receive");
    //     console.log(newProps);
    //     this.setModuleId(newProps.moduleId);
    //     this.findAllLessonsForModule(newProps.moduleId)
    // }

    deleteLesson() {
        console.log("deletingLesson");
        this.lessonService
            .deleteLesson(this.state.lessonId).then(this.abc);
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

    renderListOfLessons() {
        console.log("renderingLessonsList");
        console.log(this.state);
        var self = this;

        let lessons = this.state.lessons.map((lesson) => {
            console.log("returningLessons");
            this.setLessonId(lesson.id);
            return (
                <li className="nav-item nav-link">
                    {lesson.title}
                    {/*{self.setLessonId(lesson.id)}*/}
                    <button onClick={self.deleteLesson.bind(self)}>x</button>
                </li>
            );
        });

        console.log(lessons);
        return lessons;

        // return (
        //     <div className="row">
        //         <li className="nav-item"><a className="nav-link active"
        //                                     href="/courses">Active Tab</a></li>
        //         <li className="nav-item"><a className="nav-link"
        //                                     href="#">Another Tab</a></li>
        //     </div>);
    }

    createLesson() {
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
