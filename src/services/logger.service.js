
export var logger = {
    error: function(app,_module,property,message){
        throw new Error(`${app} - ${_module} - ${property} -- ${message}`);
    },
    warn: function(app,_module,property,message) {
        console.warn(`${app} - ${_module} - ${property} -- ${message}`);
    }
}
