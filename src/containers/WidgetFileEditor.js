import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions/WidgetActions"
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.state = {lessonId: ''};
        this.selectLesson = this.selectLesson.bind(this);
        this.saveToServer = this.saveToServer.bind(this);
    }

    componentDidMount() {
        this.selectLesson
        (this.props.match.params.lessonId);
        if (!(this.props.lessonId === 'undefined')) {
            this.props.findAllWidgetsForLesson(this.props.match.params.lessonId);
        }
    }

    componentWillReceiveProps(newProps) {
        this.selectLesson
        (newProps.match.params.lessonId);

    }

    selectLesson(lessonId) {
        this.setState({lessonId: lessonId});
    }

    saveToServer() {

        this.props.save(this.state.lessonId);
    }

    render() {
        return (
            <div>
                <div className='float-right'>
                    <h1>Widget List {this.props.widgets.length}</h1>
                </div>
                <button className="float-right" disabled={this.props.previewMode} onClick={this.saveToServer}>
                    Save
                </button>


                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>Add widget
                </button>
            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})
const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch, lessonId),
    preview: () => actions.preview(dispatch)
})
const WidgetListContainer = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListContainer