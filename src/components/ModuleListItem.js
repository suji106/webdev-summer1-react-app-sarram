import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import ModuleService from "../services/ModuleService";

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.deleteModuleItem = this.deleteModuleItem.bind(this);
        this.moduleService = ModuleService.instance;
        // console.log(this.state);
    }

    deleteModuleItem() {
        // console.log(this.state.module);
        var input = window.confirm("Are you sure?");
        if (input === true) {
            this.moduleService
                .deleteModule(this.props.courseId, this.props.module.id).then(this.props.callback);
        }
    }

    render() {
        var title = this.state.module.title;
        console.log("renderingModuleList");
        console.log(this.props);
        return (
                <div className="list-group-item" id="moduleRow">
                    <Link to={`/course/${this.props.courseId}/${this.props.module.id}`} id="moduleTitle">
                        {title}
                    </Link>
                    <span className='float-right'>
                        <i className="fa fa-trash" onClick={this.deleteModuleItem}></i>
                    </span>
                </div>
        );
    }
}
