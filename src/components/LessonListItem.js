import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import ModuleService from "../services/ModuleService";
import LessonService from "../services/LessonService";

export default class LessonListItem
    extends React.Component {
    constructor(props) {
        console.log("lessonListItemConstructor");
        console.log(props);
        super(props);
        this.state = {
            moduleId: '',
            lesson: {title: ''},
            lessons: []
        };

        // this.state = props;
        this.lessonService = LessonService.instance;
        this.renderListOfLessons = this.renderListOfLessons.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.findAllLessonsForModule(props.moduleId);
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

    renderListOfLessons() {
        console.log("renderingLessonsList");
        console.log(this.state);

        let lessons = this.state.lessons.map(function (lesson) {
            console.log("returningLessons");
            return (
                <li className="nav-item nav-link">
                    {lesson.title}
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
                    Add_Lesson
                </li>
            </div>);
    }
}
