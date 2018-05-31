import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const Paragraph = ({widget, preview, changedText, nameChanged}) => {
    let inputNameElem
    let inputElem
    return (
        <div>
            <div hidden={preview}>
                <div>
                <textarea placeholder="Para Content" onChange={() => changedText(widget.id, inputElem.value)}
                          value={widget.text}
                          ref={node => inputElem = node}/>
                </div>
                <div>
                    <input placeholder="Widget Name" onChange={() => nameChanged(widget.id, inputNameElem.value)}
                           value={widget.name}
                           ref={node => inputNameElem = node}/>
                </div>
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

const dispatchToPropertiesMapper = dispatch => ({
    changedText: (widgetId, textToChange) =>
        actions.changedText(dispatch, widgetId, textToChange),

    nameChanged: (widgetId, nameToChange) =>
        actions.changedName(dispatch, widgetId, nameToChange),

})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetParagraphBox = connect(stateToPropsMapper, dispatchToPropertiesMapper)(Paragraph)
export default WidgetParagraphBox;
