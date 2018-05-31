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
                <h2>
                    Heading {widget.size}
                </h2>
                <input onChange={() => changedHref(widget.id, hrefInputElem.value)}
                       value={widget.href}
                       ref={node => hrefInputElem = node}/>
                <input onChange={() => changedText(widget.id, textInputElem.value)}
                       value={widget.text}
                       ref={node => textInputElem = node}/>
                <input onChange={() => changedName(widget.id, nameInputElem.value)}
                       value={widget.name}
                       ref={node => nameInputElem = node}/>
                <h3>
                    Preview
                </h3>
            </div>
            <a href={widget.href}> {widget.text} </a>
        </div>
    )
}

const dispatchToPropsMapper = dispatch => ({
    changedText: (widgetId, newText) =>
        actions.changedText(dispatch, widgetId, newText),
    changedHref: (widgetId, newHref) =>
        actions.changedHref(dispatch, widgetId, newHref),
    changedName: (widgetId, newName) =>
        actions.changedName(dispatch, widgetId, newName),
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetLinkBox = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)
export default WidgetLinkBox;
