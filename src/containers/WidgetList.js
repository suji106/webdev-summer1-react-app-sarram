import React, {Component} from 'react'
import * as actions from "../actions/WidgetActions"
import WidgetBox from '../components/Widget'
import {connect} from 'react-redux'

class WidgetList extends Component {
    constructor(props) {
        console.log("widgetListEditorConstructor");
        super(props)
        this.saveChanges = this.saveChanges.bind(this);
    }

    saveChanges() {
        this.props.save(this.state.lessonId);
    }

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        this.setState({lessonId: newProps.lessonId});
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({lessonId: this.props.lessonId});
        if (!(this.props.lessonId === 'undefined')) {
            this.props.findAllWidgetsForLesson(this.props.lessonId);
        }
    }

    render() {
        console.log("renderingWidgets");
        console.log(this.props);
        return (
            <div>
                <div className='float-right'>
                    <h1>
                        Widget List {this.props.widgets.length}
                    </h1>
                </div>
                <button className="float-right" disabled={this.props.previewMode} onClick={this.saveChanges}>
                    Save!
                </button>

                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetBox widget={widget}
                                   preview={this.props.previewMode}
                                   key={widget.id}/>
                    ))}
                </ul>
                <button onClick={this.props.addWidget}>
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

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

const WidgetListBox = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)

export default WidgetListBox
