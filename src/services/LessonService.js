const LESSON_API_URL =
    'http://localhost:8080/api/course/MID/lesson';
const MODULE_DELETE_API_URL =
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
            })
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

    deleteModule(courseId, moduleId) {
        // console.log("deletingModule");
        var date = new Date();
        var model_json = {
            id: moduleId,
            modified: date.getTime(),
        };

        // console.log(model_json);
        return fetch(MODULE_DELETE_API_URL + '/' + parseInt(moduleId, 10),
            {
                body: JSON.stringify(model_json),
                headers: {'Content-Type': 'application/json'},
                method: 'DELETE'
            });
    }

    static get instance() {
        console.log("insideLessonServiceInstance");
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        // console.log(this[_singleton]);
        return this[_singleton]
    }
}
