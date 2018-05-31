import React from 'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import WidgetHeadingBox from './WidgetHeading'
import WidgetParagraphBox from './WidgetParagraph'
import WidgetListBox from './WidgetList'
import WidgetImageBox from './WidgetImage'
import WidgetLinkBox from './WidgetLink'

const Widget = ({widget, preview, dispatch}) => {
    let selectElement
    console.log("widgetBox");
    return (
        <li>
            <div hidden={preview}>
                {widget.id} {widget.widgetType}

                <select value={widget.widgetType}
                        onChange={e =>
                            dispatch({
                                type: 'SELECT_WIDGET_TYPE',
                                id: widget.id,
                                widgetType: selectElement.value
                            })} ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Link</option>
                    <option>Image</option>
                </select>

                <button onClick={e => (
                    dispatch({type: DELETE_WIDGET, id: widget.id})
                )}>Delete
                </button>
            </div>
            <div>
                {widget.widgetType === 'Heading' && <WidgetHeadingBox widget={widget}/>}
                {widget.widgetType === 'Paragraph' && <WidgetParagraphBox widget={widget}/>}
                {widget.widgetType === 'List' && <WidgetListBox widget={widget}/>}
                {widget.widgetType === 'Image' && <WidgetImageBox widget={widget}/>}
                {widget.widgetType === 'Link' && <WidgetLinkBox widget={widget}/>}
            </div>
        </li>
    )
}

const WidgetBox = connect(state => ({
    preview: state.preview
}))(Widget)

export default WidgetBox
