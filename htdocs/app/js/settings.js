
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
     //   backendBaseUrl: "http://lnsubackend.jakobklamser.net/",
        release: false,
        pushState: false, //history.pushState
        runTests: false,
        imagesPath: 'media/image/',
        jsonPath: 'app/data/data.json',
        shipconfig: 'app/data/shipconfig.json',
        loglevel: 'trace', //trace, debug, info, warn, error
        startContentAt: 'chapter01'
    };
    
    function setBackendUrl(){
        if(window.location.href.indexOf("http://lnsu-frontend.maier-niklas.de/") >= 0)
        {
            defaultConfig.backendBaseUrl = "http://lnsubackend.jakobklamser.net/";
        }
        else
        {
            defaultConfig.backendBaseUrl = "http://lnsu-backend.local/";
        }
    }
    setBackendUrl();
    
    return _.extend(defaultConfig);
});