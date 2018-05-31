import * as constants from "../constants/WidgetConstants"

export const changedText = (dispatch, widgetId, textToChange) => (
    dispatch({
        type: constants.CHANGED_TEXT,
        id: widgetId,
        text: textToChange
    })
)
export const headingSizeChanged = (dispatch, widgetId, sizeToChange) => (
    dispatch({
        type: constants.CHANGED_SIZE_HEADING,
        id: widgetId,
        size: sizeToChange
    })
)

export const listTypeChanged = (dispatch, widgetId, typeToChange) => (
    dispatch({
        type: constants.CHANGED_LIST_TYPE,
        id: widgetId,
        listType: typeToChange
    })
)

export const changedName = (dispatch, widgetId, nameToChange) => (
    dispatch({
        type: constants.CHANGED_NAME,
        id: widgetId,
        name: nameToChange
    })
)

export const srcChanged = (dispatch, widgetId, newSrc) => (
    dispatch({
        type: constants.CHANGED_SRC,
        id: widgetId,
        src: newSrc
    })
)

export const changedHref = (dispatch, widgetId, hrefToChange) => (
    dispatch({
        type: constants.CHANGED_HREF,
        id: widgetId,
        href: hrefToChange
    })
)

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    console.log("findingAllWidgets");
    fetch('https://s-arram.herokuapp.com/api/lesson/' + lessonId + "/widget")
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
