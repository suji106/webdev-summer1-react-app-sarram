import * as constants from "../constants/WidgetConstants"

export const changedText = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
)

export const listTypeChanged = (dispatch, widgetId, newType) => (
    dispatch({
        type: constants.LIST_TYPE_CHANGED,
        id: widgetId,
        listType: newType
    })
)

export const changedName = (dispatch, widgetId, newName) => (
    dispatch({
        type: constants.NAME_CHANGED,
        id: widgetId,
        name: newName
    })
)

export const srcChanged = (dispatch, widgetId, newSrc) => (
    dispatch({
        type: constants.SRC_CHANGED,
        id: widgetId,
        src: newSrc
    })
)

export const changedHref = (dispatch, widgetId, newHref) => (
    dispatch({
        type: constants.HREF_CHANGED,
        id: widgetId,
        href: newHref
    })
)

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    console.log("findingAllWidgets");
    fetch('http://localhost:8080/api/lesson/' + lessonId + "/widget")
        .then(response => (response.json()))
        .catch((e) => console.log(e))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
            widgets: widgets
        }))
}

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
)

export const save = (dispatch, lessonId) => (
    dispatch({
        type: constants.SAVE,
        lessonId: lessonId
    })
)

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
)
