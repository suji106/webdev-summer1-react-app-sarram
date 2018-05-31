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
                    <h2>
                        Heading {this.props.widget.size}
                    </h2>
                    <textarea onChange={() => this.props.textChanged(this.props.widget.id, inputElem.value)}
                              value={this.props.widget.text}
                              ref={node => inputElem = node}/>
                    <input onChange={() => this.props.nameChanged(this.props.widget.id, inputNameElem.value)}
                           value={this.props.widget.name}
                           ref={node => inputNameElem = node}/>
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

const dispatchToPropsMapper = dispatch => ({

    textChanged: (widgetId, newText) =>
        actions.changedText(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
        actions.changedName(dispatch, widgetId, newName),

    listTypeChanged: (widgetId, newType) =>
        actions.listTypeChanged(dispatch, widgetId, newType)
})

const stateToPropsMapper = state => ({
    preview: state.preview
})

const WidgetListBox = connect(stateToPropsMapper, dispatchToPropsMapper)(List)
export default WidgetListBox;
