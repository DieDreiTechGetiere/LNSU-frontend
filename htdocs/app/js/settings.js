
define(function(require)
{
    var underscopre = require("underscore");
        
    var appEnvironments = {
        local: "local",
        live: "live",
        dev: "dev"
    };

    var defaultConfig = {
        appEnvironment: "dev",
        backendBaseUrl: "http://lnsu-backend.local/",
     //   backendBaseUrl: "http://lnsubackend.jakobklamser.net/",
        release: false,
        pushState: false, //history.pushState
        runTests: false,
        imagesPath: 'media/images/',
        jsonPath: 'app/data/data.json',
        shipconfig: 'app/data/shipconfig.json',
        loglevel: 'trace', //trace, debug, info, warn, error
        startContentAt: 'chapter01'
    };
    
    return _.extend(defaultConfig);
});