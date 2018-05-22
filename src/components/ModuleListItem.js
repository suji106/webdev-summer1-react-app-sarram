import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import ModuleService from "../services/ModuleService";

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        this.deleteModuleItem = this.deleteModuleItem.bind(this);
        this.moduleService = ModuleService.instance;
        console.log(this.state);
    }

    deleteModuleItem() {
        console.log(this.state.module);
        this.moduleService
            .deleteModule(this.props.courseId, this.props.module.id).then(this.props.callback);
    }

    render() {
        var title = this.state.module.title;
        return (
            <Router>
                <Link to="/course/12" className="list-group-item">
                    {title}
                    <span className="float-right">
                        <i className="fa fa-trash" onClick={this.deleteModuleItem}></i>
                    </span>
                </Link>
            </Router>
        );
    }
}