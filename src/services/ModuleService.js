const MODULE_API_URL =
    'http://localhost:8080/api/course/CID/module';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        console.log("insideModuleServiceConstructor");
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    findAllModulesForCourse(courseId) {
        console.log("fetchingAllModules");
        return fetch(
            MODULE_API_URL
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    createModule(courseId, module) {
        console.log("creatingModule");
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
                return response.json();
        })
    }

    static get instance() {
        console.log("insideModuleServiceInstance");
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        console.log(this[_singleton]);
        return this[_singleton]
    }
}
