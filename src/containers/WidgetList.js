import React, {Component} from 'react'
import * as actions from "../actions/WidgetActions"
import WidgetBox from '../components/Widget'
import {connect} from 'react-redux'

class WidgetList extends Component {
    constructor(props) {
        console.log("widgetListEditorConstructor");
        super(props)
        this.state = {lessonId: ''};
        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges() {
        this.props.save(this.state.lessonId);
        alert("Save Successful :)");
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({lessonId: newProps.lessonId});
        if(this.props.lessonId != newProps.lessonId) {
            this.props.findAllWidgetsForLesson(newProps.lessonId);
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({lessonId: this.props.lessonId});
    }

    render() {
        console.log("renderingWidgets");
        console.log(this.props);
        return (
            <div>
                <div id="preview-save">
                    <button id="save" className="float-right btn" disabled={this.props.previewMode} onClick={this.saveChanges}>
                        Save!
                    </button>

                    <button className="float-right btn" onClick={this.props.preview}>
                        Preview!
                    </button>
                </div>

                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetBox widget={widget}
                                   preview={this.props.previewMode}
                                   key={widget.id}/>
                    ))}
                </ul>

                <button className="add-btn btn" onClick={this.props.addWidget}>
                    Add Widget!!
                </button>
            </div>
        )
    }
}

const dispatcherToPropsMapper
    = dispatch => ({
    findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch, lessonId),
    addWidget: () => actions.addWidget(dispatch),
    save: (lessonId) => actions.save(dispatch, lessonId),
    preview: () => actions.preview(dispatch)
})

const propsMapperFromState = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

const WidgetListBox = connect(
    propsMapperFromState,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListBox
