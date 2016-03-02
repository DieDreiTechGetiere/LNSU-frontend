define({
    
    command: 
    {
        
        application: 
        {
            LOGIN_SUCCESS: "loginSuccess:application",
            START_ROUTER: "startRouter:application",
            INIT_DASHBOARD: "initDashboardView:application"
        },
        
        navigation:
        {
            NAVI_CLICK: "naviClick:navigation"
        },
        
        match:
        {
            DELETE: "deleteMatch:match"
        }
    },
    
    router:
    {
        DASHBOARD: "dashboard",
        LOGIN: "",
    },
        
    event: 
    {
        SECTION_READY: "sectionReady:event"
    }
});