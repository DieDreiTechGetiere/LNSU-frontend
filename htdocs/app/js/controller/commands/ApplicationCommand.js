/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var UserModel = require("models/UserModel");

    var ApplicationCommand = {
        //@methods----------------------------------------------------------------------

        /**
         *
         */
        handleLoginSuccess: function(userData)
        {
            app.userModel = new UserModel({
                id: userData.id,
                ingameName: userData.ingameName,
                loginName: userData.loginName,
                role: parseInt(userData.role)
            });
            
            var now = new Date();
            var time = now.getTime();
            now.setTime(time += 3600 * 1000);
            
            document.cookie = "userId=" + userData.id + '; expires=' + now.toUTCString() + "; path=/";
            document.cookie = "ingameName=" + userData.ingameName + '; expires=' + now.toUTCString() + "; path=/";
            document.cookie = "loginName=" + userData.loginName + '; expires=' + now.toUTCString() + "; path=/";
            document.cookie = "role=" + parseInt(userData.role) + '; expires=' + now.toUTCString() + "; path=/";
            
            app.model.get("dashboard").fetchDashboardData();
        },


        /**
         * 
         */
        initDashboardView: function()
        {
            app.view.initDashboardView();
        }
    };
    return ApplicationCommand;
});