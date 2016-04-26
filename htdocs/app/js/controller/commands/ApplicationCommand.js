/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var UserModel = require("models/UserModel");
    var notification = require("notification");

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
            
            app.storageModel.save("userId", userData.id);
            app.storageModel.save("ingameName", userData.ingameName);
            app.storageModel.save("loginName", userData.loginName);
            app.storageModel.save("role", parseInt(userData.role));
            app.storageModel.save("logginTime", now.toUTCString());
            
            app.model.get("dashboard").fetchDashboardData();
        },


        /**
         * 
         */
        initDashboardView: function()
        {
            app.view.initDashboardView();
        },
        
        
        /**
         * 
         */
        logOut: function()
        {
            app.storageModel.destroy();
            app.execute(notification.command.match.DELETE);
            location.reload();
        }
    };
    return ApplicationCommand;
});