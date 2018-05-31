import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'
import CourseService from "../services/CourseService";

export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            module: {title: ''},
            modules: [
            ]
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.xyz = this.xyz.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.renderListOfModules = this.renderListOfModules.bind(this);
        this.getCourseById = this.getCourseById.bind(this);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    findAllModulesForCourse(courseId) {
        // console.log("findingModulesForCourseModuleList");
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules);
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        // console.log("mountedModuleList");
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        // console.log("creatingModule");
        // console.log(this.self.state.module.title);
        if(this.state.module.title === "")
        {
            this.state = {
                courseId: '',
                module: {title: 'Untitled Module'},
                modules: [
                ]
            };
        }

        this.moduleService
            .createModule(this.props.courseId, this.state.module).then(this.xyz);
        this.setState({
            module: {title: ''}
        });
    }

    xyz(){
        this.findAllModulesForCourse(this.props.courseId);
    }

    titleChanged(event) {
        // console.log("titleChanging");
        this.setState({module: {title: event.target.value}});
    }

    getCourseById(courseId){
        // console.log("gettingCourseById");
        // var courseId = this.self.state.courseId;
        var titleCourse = null;
        if (courseId !== "") {
            titleCourse = this.courseService
                .getCourseById(courseId);
            // console.log(title);
        }
        else {
            titleCourse = "No Title Yet";
        }
        // console.log(title);
        return titleCourse;
    }

    renderListOfModules() {
        var self = this;
        let modules = this.state.modules.map(function (module) {
            // console.log(module.id);
            return <ModuleListItem module={module} courseId={self.state.courseId}
                                   key={module.id} callback={self.xyz}/>
        });
        return modules;
    }

    render() {
        return (
            <div>
                <ul className="list-group" id="modulesListDiv">
                    {this.renderListOfModules()}
                </ul>
                <div>
                    <input  id="moduleInput"
                            onChange={this.titleChanged}
                           value={this.state.module.title}
                           placeholder="Module Name"
                           className="form-control"/>
                    <button onClick={this.createModule} className="btn btn-primary btn-block">
                        <i className="fa fa-plus"></i>
                    </button>
                    <br/>
                </div>
            </div>
        );
    }
}
