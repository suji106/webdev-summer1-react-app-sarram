const MODULE_API_URL =
    'http://localhost:8080/api/course/CID/module';
const MODULE_DELETE_API_URL =
    'http://localhost:8080/api/module';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        // console.log("insideModuleServiceConstructor");
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        // console.log("fetchingAllModules");
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                var j = response.json();
                // console.log(j);
                return j;
            })
    }

    createModule(courseId, module) {
        // console.log("creatingModule");
        var date = new Date();
        var model_json = {
            title: module.title,
            modified: date.getTime(),
        };

        // console.log()
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(model_json),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
                return response.json();
        })
    }

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
        // console.log("insideModuleServiceInstance");
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        // console.log(this[_singleton]);
        return this[_singleton]
    }
}
