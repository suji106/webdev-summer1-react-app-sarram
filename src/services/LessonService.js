const LESSON_API_URL =
    'http://localhost:8080/api/course/MID/lesson';
const LESSON_DELETE_CREATE_API_URL =
    'http://localhost:8080/api/lesson';

let _singleton = Symbol();
export default class LessonService {
    constructor(singletonToken) {
        console.log("insideLessonServiceConstructor");
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllLessonsForModule(moduleId) {
        console.log("fetchingAllLessons");
        console.log(moduleId);
        return fetch(
            LESSON_API_URL
                .replace('MID', moduleId))
            .then(function (response) {
                var j = response.json();
                // console.log(j);
                return j;
            });
    }

    deleteLesson(lessonId) {
        console.log("deletingLesson");
        console.log(lessonId);
        return fetch(
            LESSON_DELETE_CREATE_API_URL +  '/' + lessonId,
            {
                method: 'DELETE'
            });
    }

    createLesson(moduleId, title) {
        console.log("creatingLessonService");
        console.log(moduleId);
        var date = new Date();
        var lesson_json = {
            title: title,
            modified: date.getTime()
        };
        return fetch(
            LESSON_DELETE_CREATE_API_URL + '/' + moduleId,
            {
                body: JSON.stringify(lesson_json),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            });
    }



    // createModule(courseId, module) {
    //     // console.log("creatingModule");
    //     var date = new Date();
    //     var model_json = {
    //         title: module.title,
    //         modified: date.getTime(),
    //     };
    //
    //     // console.log()
    //     return fetch(MODULE_API_URL.replace('CID', courseId),
    //         {
    //             body: JSON.stringify(model_json),
    //             headers: {'Content-Type': 'application/json'},
    //             method: 'POST'
    //         }).then(function (response) {
    //         return response.json();
    //     })
    // }

    static get instance() {
        console.log("insideLessonServiceInstance");
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        // console.log(this[_singleton]);
        return this[_singleton]
    }
}
