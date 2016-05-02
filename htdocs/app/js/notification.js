define({
    
    command: 
    {
        
        application: 
        {
            LOGIN_SUCCESS: "loginSuccess:application",
            START_ROUTER: "startRouter:application",
            LOGOUT: "logOut:application",
            INIT_DASHBOARD: "initDashboardView:application",
            OPEN_OVERLAY: "openOverlay:application"
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
        CLOSE_ADMIN: "closeAdminView:event",
        SWITCH_GAME_FIELDS: "switchGameFields:event",
        SHIP_COUNT_UPDATE: "shipCountUpdate:event",
        OPPONENT_HIT_ME: "opponentHitMe:event"
    }
});