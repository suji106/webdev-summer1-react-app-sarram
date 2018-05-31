import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const Heading = ({widget, preview, textChanged, headingSizeChanged, nameChanged}) => {
    let selectElem
    let inputNameElem
    let inputTextElem

    return (
        <div>
            <div hidden={preview}>
                <div>
                    <div>
                        <input placeholder="Heading!" onChange={() => textChanged(widget.id, inputTextElem.value)}
                               value={widget.text}
                               ref={node => inputTextElem = node}/>
                    </div>
                    <div>
                        <input placeholder="Widget Name!" onChange={() => nameChanged(widget.id, inputNameElem.value)}
                               value={widget.name}
                               ref={node => inputNameElem = node}/>
                    </div>
                    <div>
                        <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                                value={widget.size}
                                ref={node => selectElem = node}>
                            <option value="1">
                                Heading 1
                            </option>
                            <option value="2">
                                Heading 2
                            </option>
                            <option value="3">
                                Heading 3
                            </option>
                        </select>
                    </div>
                </div>

                <h3>
                    Preview
                </h3>
            </div>

            {widget.size === 1 &&
            <h1>
                {widget.text}
            </h1>}
            {widget.size === 2 &&
            <h2>
                {widget.text}
            </h2>}
            {widget.size === 3 &&
            <h3>
                {widget.text}
            </h3>}

        </div>
    )
}

const dispatchToPropertiesMapper = dispatch => ({
    textChanged: (widgetId, textToChange) =>
        actions.changedText(dispatch, widgetId, textToChange),
    nameChanged: (widgetId, nameToChange) =>
        actions.changedName(dispatch, widgetId, nameToChange),
    headingSizeChanged: (widgetId, sizeToChange) =>
        actions.headingSizeChanged(dispatch, widgetId, sizeToChange)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetHeadingBox = connect(stateToPropsMapper, dispatchToPropertiesMapper)(Heading)
export default WidgetHeadingBox;
