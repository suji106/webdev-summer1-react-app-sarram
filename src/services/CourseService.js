let _singleton = Symbol();
const COURSE_API_URL =
    'http://localhost:8080/api/course';

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        console.log("findCoursesCourseService");
        return fetch(COURSE_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    createCourse(course) {
        var date = new Date();
        var course_json = {
            title: course.title,
            created: date.getTime(),
            modified: date.getTime(),
        };
        var j = JSON.stringify(course_json);
        console.log(j);
        return fetch(COURSE_API_URL, {
            body: j,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        console.log("deletingCourseService");
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'DELETE'
        });
    }

    getCourseById(courseId) {
        console.log("gettingCourseByIdCourseService");
        var url = COURSE_API_URL + '/' + courseId;
        console.log(url);
        var r = fetch(url).then((response) => {console.log("ss");
            return "aaa";
        });
        return "Course Modules";
    }

    waiter (response) {
        console.log("lllllllllllll");
        var resp = response;
        // var s = resp.json();
        console.log(resp);
        return "WD";
    }
}

export default CourseService;
