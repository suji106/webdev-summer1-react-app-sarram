const LESSON_API_URL =
    'http://s-arram.herokuapp.com/api/course/MID/lesson';
const LESSON_DELETE_CREATE_API_URL =
    'http://s-arram.herokuapp.com/api/lesson';

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

    static get instance() {
        console.log("insideLessonServiceInstance");
        if (!this[_singleton])
            this[_singleton] = new LessonService(_singleton);
        // console.log(this[_singleton]);
        return this[_singleton]
    }
}
