import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/WidgetActions'

const Link = ({widget, preview, changedHref, changedName, changedText}) => {
    let nameInputElem
    let textInputElem
    let hrefInputElem

    return (
        <div>
            <div hidden={preview}>
                <div>
                    <input placeholder="Link" onChange={() => changedHref(widget.id, hrefInputElem.value)}
                           value={widget.href}
                           ref={node => hrefInputElem = node}/>
                </div>
                <div>
                    <input placeholder="Link Text" onChange={() => changedText(widget.id, textInputElem.value)}
                           value={widget.text}
                           ref={node => textInputElem = node}/>
                </div>
                <div>
                    <input placeholder="Widget Name" onChange={() => changedName(widget.id, nameInputElem.value)}
                           value={widget.name}
                           ref={node => nameInputElem = node}/>
                </div>
                <h3>
                    Preview
                </h3>
            </div>
            <a href={widget.href}> {widget.text} </a>
        </div>
    )
}

const dispatchToPropertiesMapper = dispatch => ({
    changedText: (widgetId, textToChange) =>
        actions.changedText(dispatch, widgetId, textToChange),
    changedHref: (widgetId, hrefToChange) =>
        actions.changedHref(dispatch, widgetId, hrefToChange),
    changedName: (widgetId, nameToChange) =>
        actions.changedName(dispatch, widgetId, nameToChange),
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetLinkBox = connect(stateToPropsMapper, dispatchToPropertiesMapper)(Link)
export default WidgetLinkBox;
