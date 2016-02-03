
define(function(require)
{

    var appEnvironment = "local";
        
    var appEnvironments = {
        local: "local",
        live: "live",
        dev: "dev"
    };

    var defaultConfig = {
        backendBaseUrl: "http://lnsu-backend.de/",
        release: false,
        pushState: false, //history.pushState
        runTests: false,
        imagesPath: 'media/images/',
        jsonPath: 'app/data/data.json',
        loglevel: 'trace', //trace, debug, info, warn, error
        startContentAt: 'chapter01'
    };

    return _.extend(defaultConfig, appEnvironments[appEnvironment]);
});