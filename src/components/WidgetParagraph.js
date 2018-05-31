import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const Paragraph = ({widget, preview, changedText, nameChanged}) => {
    let inputNameElem
    let inputElem
    return (
        <div>
            <div hidden={preview}>
                <h2>
                    Heading {widget.size}
                </h2>
                <textarea onChange={() => changedText(widget.id, inputElem.value)}
                          value={widget.text}
                          ref={node => inputElem = node}/>
                <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                       value={widget.name}
                       ref={node => inputNameElem = node}/>
                <h3>
                    Preview
                </h3>
            </div>
            <div>
                <h1>
                    {widget.text}
                </h1>
            </div>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    changedText: (widgetId, newText) =>
        actions.changedText(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
        actions.changedName(dispatch, widgetId, newName),

})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetParagraphBox = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)
export default WidgetParagraphBox;
