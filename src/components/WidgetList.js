import React from 'react'
import * as actions from '../actions/WidgetActions'
import {connect} from 'react-redux'

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    textToOrderedList(text) {
        let stringArray = text.split("\n");
        return (
            <ol className="list-group">
                {stringArray.map(line => (<li> {line} </li>))}
            </ol>
        );
    }

    textToUnOrderedList(text) {
        let stringArray = text.split("\n");
        return (
            <ul className="list-group">
                {stringArray.map(line => (<li> {line} </li>))}
            </ul>
        );
    }

    render() {
        let inputNameElem
        let inputElem
        let selectElem
        console.log(this.props.widget.listType);
        return (
            <div>
                <div hidden={this.props.preview}>
                    <div>
                    <textarea placeholder="List Items" onChange={() => this.props.textChanged(this.props.widget.id, inputElem.value)}
                              value={this.props.widget.text}
                              ref={node => inputElem = node}/>
                    </div>
                    <div>
                        <input placeholder="Widget Name" onChange={() => this.props.nameChanged(this.props.widget.id, inputNameElem.value)}
                               value={this.props.widget.name}
                               ref={node => inputNameElem = node}/>
                    </div>
                    <div>
                        <select onChange={() => this.props.listTypeChanged(this.props.widget.id, selectElem.value)}
                                value={this.props.widget.listType}
                                ref={node => selectElem = node}>
                            <option value="unordered">
                                Unordered List
                            </option>
                            <option value="ordered">
                                Ordered List
                            </option>
                        </select>
                    </div>
                    <h3>
                        Preview
                    </h3>
                </div>
                <div>
                    {this.props.widget.listType == 'unordered' &&
                    <div>
                        {this.textToUnOrderedList(this.props.widget.text)}
                    </div>}
                    {this.props.widget.listType == 'ordered' &&
                    <div>
                        {this.textToOrderedList(this.props.widget.text)}
                    </div>}
                </div>
            </div>
        );
    }
}

const dispatchToPropertiesMapper = dispatch => ({

    textChanged: (widgetId, textToChange) =>
        actions.changedText(dispatch, widgetId, textToChange),

    nameChanged: (widgetId, nameToChange) =>
        actions.changedName(dispatch, widgetId, nameToChange),

    listTypeChanged: (widgetId, typeToChange) =>
        actions.listTypeChanged(dispatch, widgetId, typeToChange)
})

const propsMapperFromState = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
})

const WidgetListBox = connect(propsMapperFromState, dispatchToPropertiesMapper)(List)
export default WidgetListBox;
