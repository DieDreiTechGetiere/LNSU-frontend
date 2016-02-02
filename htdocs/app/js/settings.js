
define(function(require){
    
    var settings = {
        
        appEnvironment: null,
        
        appEnvironments: {
            local: "local",
            live: "live",
            dev: "dev"
        },
        
        defaultConfig: {
            release: false,
            loglevel: 'trace', //trace, debug, info, warn, error
            runTests: false
        }
    };
    
    settings.appEnvironment = settings.appEnvironments.dev;
    
    return settings;
});