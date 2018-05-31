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

        case constants.TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HREF_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.LIST_TYPE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.NAME_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.name = action.name
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.SRC_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if (widget.id === action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            }

        case constants.SELECT_WIDGET_TYPE:
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
            var postUrl='http://localhost:8080/api/lesson/' + lessonId + "/widgets";
            console.log(postUrl);
            fetch(postUrl, {
                method: 'POST',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })

            return state

        case constants.FIND_ALL_WIDGETS_FOR_LESSON:
            console.log(action.widgets);
            newState = Object.assign({}, state)
            newState.widgets = action.widgets
            return newState

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }

        case constants.ADD_WIDGET:
            console.log(state);
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        text: 'New Widget',
                        name: 'Widget Name',
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