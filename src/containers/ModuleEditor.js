import React from 'react';
import LessonTabs from './LessonTabs';
import WidgetListContainer from './WidgetListEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class ModuleEditor
    extends React.Component {

    constructor(props) {
        console.log(props);
        super(props)
        this.state = {moduleId: props.match.params.moduleId};
    }

    componentDidMount() {

    }

    componentWillReceiveProps(newProps) {
        this.setState({moduleId: newProps.match.params.moduleId});
    }

    render() {
        console.log(this.props);
        console.log(this.state.moduleId);
        return (
            <Router>
                <div>
                    <LessonTabs moduleId={this.state.moduleId}/>
                    <div id="lesson-editor">
                        <Route path="/lesson/:lessonId"
                               exact component={WidgetListContainer}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}
