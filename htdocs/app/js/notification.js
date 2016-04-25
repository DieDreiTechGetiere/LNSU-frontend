define({
    
    command: 
    {
        
        application: 
        {
            LOGIN_SUCCESS: "loginSuccess:application",
            START_ROUTER: "startRouter:application",
            LOGOUT: "logOut:application",
            INIT_DASHBOARD: "initDashboardView:application"
        },
        
        match:
        {
            DELETE: "deleteMatch:match",
            START: "start:match",
            INIT_GRID: "initGrid:match",
            SAVE_SHIPS: "saveShips:match",
            ATTACK: "attack:match"
        }
    },
    
    router:
    {
        DASHBOARD: "dashboard",
        LOGIN: "",
        ADMIN: "dashboard/admin",
        MATCH: "match"
    },
        
    event: 
    {
        SECTION_READY: "sectionReady:event",
        SHOW_ADMIN: "showAdminView:event",
        FETCH_ADMIN: "fetchAdmin:event",
        CLOSE_ADMIN: "closeAdminView:event"
    }
});