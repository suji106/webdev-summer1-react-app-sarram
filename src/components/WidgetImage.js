import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const Image = ({widget, preview, srcChanged, nameChanged}) => {
    let inputNameElem
    let inputSrcElem

    return (
        <div>
            <div hidden={preview}>
                <div>
                    <div>
                        <input placeholder="Image URL" onChange={() => srcChanged(widget.id, inputSrcElem.value)}
                               value={widget.src}
                               ref={node => inputSrcElem = node}/>
                    </div>
                    <div>
                        <input placeholder="Widget Name" onChange={() => nameChanged(widget.id, inputNameElem.value)}
                               value={widget.name}
                               ref={node => inputNameElem = node}/>
                    </div>

                </div>
                <h3>
                    Preview
                </h3>
            </div>
            <img id="image-preview" src={widget.src} alt="image not found"/>
        </div>
    )
}

const dispatchToPropertiesMapper = dispatch => ({
    srcChanged: (widgetId, textToChange) =>
        actions.srcChanged(dispatch, widgetId, textToChange),
    nameChanged: (widgetId, nameToChange) =>
        actions.changedName(dispatch, widgetId, nameToChange),
    headingSizeChanged: (widgetId, sizeToChange) =>
        actions.headingSizeChanged(dispatch, widgetId, sizeToChange)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetImageBox = connect(stateToPropsMapper, dispatchToPropertiesMapper)(Image)
export default WidgetImageBox;
