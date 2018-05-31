import * as constants from "../constants/WidgetConstants"

export const WidgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState
    console.log(state);
    switch (action.type) {

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case constants.CHANGED_HREF:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.CHANGED_TEXT:
            console.log(action.text);
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.CHANGED_SIZE_HEADING:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.CHANGED_LIST_TYPE:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.CHANGED_NAME:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.CHANGED_SRC:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.WIDGET_SELECT_TYPE:
            console.log(action);
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if (widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            }
            return JSON.parse(JSON.stringify(newState))

        case constants.SAVE:
            console.log(action.lessonId);
            var lessonId = action.lessonId;
            var postUrl = 'https://s-arram.herokuapp.com/api/lesson/' + lessonId + "/widgets";
            console.log(postUrl);
            fetch(postUrl, {
                method: 'POST',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })
            return state

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }

        case constants.FIND_ALL_WIDGETS_FOR_LESSON:
            console.log(action.widgets);
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState

        case constants.ADD_WIDGET:
            console.log(state);
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: '',
                        name: '',
                        widgetType: 'Heading',
                        size: '2',
                        listType: 'unordered',
                        src: '',
                        href: ''
                    }
                ]
            }

        default:
            return state
    }
}