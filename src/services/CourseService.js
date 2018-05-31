let _singleton = Symbol();
const COURSE_API_URL =
    'http://s-arram.herokuapp.com/api/course';

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
        this.resolve = this.resolve.bind(this);
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        // console.log("findCoursesCourseService");
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
        var json_body = JSON.stringify(course_json);
        // console.log(j);
        return fetch(COURSE_API_URL, {
            body: json_body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        // console.log("deletingCourseService");
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'DELETE'
        });
    }

    getCourseById(courseId) {
        // console.log("gettingCourseByIdCourseService");
        var url = COURSE_API_URL + '/' + courseId;
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET'
        }).then(this.resolve);
        return courseId;
    }

    resolve(j) {
        var x = j.json();
        console.log(x);
        return x;
    }

    // waiter (response) {
    //     // console.log("lllllllllllll");
    //     var resp = response;
    //     // var s = resp.json();
    //     // console.log(resp);
    //     return "WD";
    // }
}

export default CourseService;
