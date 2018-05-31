import React from 'react';
import LessonTabs from './LessonTabs';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import WidgetListEditor from "./WidgetListEditor";

export default class ModuleEditor
    extends React.Component {

    constructor(props) {
        console.log(props);
        super(props)
        this.state = {moduleId: props.match.params.moduleId};
    }

    componentDidMount() {
        this.setState({moduleId: this.props.match.params.moduleId});
    }

    componentWillReceiveProps(newProps) {
        this.setState({moduleId: newProps.match.params.moduleId});
    }

    render() {
        console.log(this.props);
        console.log(this.state.moduleId);
        return (
            <Router>
                <div id="module-editor">
                    <LessonTabs moduleId={this.state.moduleId}/>
                    <div id="lesson-editor">
                        <Route path="/lesson/:lessonId"
                               exact component={WidgetListEditor}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}
