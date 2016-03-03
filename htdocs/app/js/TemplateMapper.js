/**
 * Created by nmaier on 28.08.15.
 */

define(function(require)
{
    var app = require('app');

    // VIEWS
    var ApplicationView = require("views/ApplicationView");
    
    var LoginView = require("views/content/signin/login/LoginView");
    var RegisterView = require("views/content/signin/register/RegisterView");
    var SigninView = require("views/content/signin/SigninView");
    
    var DashboardView = require("views/content/dashboard/DashboardView");
    var HighscoreView = require("views/content/dashboard/highscore/HighscoreView");
    var HighscoreItemView = require("views/content/dashboard/highscore/HighscoreItemView");
    var PlayerSearchView = require("views/content/dashboard/playersearch/PlayerSearchView");
    var ProfileView = require("views/content/dashboard/profile/ProfileView");
    var RecentGamesView = require("views/content/dashboard/recentgames/RecentGamesItemView");
    
    // MODELS


    var mapper = {
        applicationView: {
            defaultView: ApplicationView
        },
        loginView: {
            defaultView: LoginView
        },
        registerView: {
            defaultView: RegisterView
        },
        signinView: {
            defaultView: SigninView
        },
        dashboardView: {
            defaultView: DashboardView
        },
        highscoreView: {
            defaultView: HighscoreView
        },
        highscoreItemView: {
            defaultView: HighscoreItemView
        },
        playerSearchView: {
            defaultView: PlayerSearchView
        },
        profileView: {
            defaultView: ProfileView
        },
        recentGamesView: {
            defaultView: RecentGamesView
        }
    };

    return {
        /**
         *
         */
        getViewFor: function(template)
        {
            if (_.has(mapper, template))
            {
                return mapper[template].defaultView;
            }
            else
            {
                throw new Error('no template-view registered for: ' + template);
            }
        },

        /**
         *
         */
        getModelFor: function(template)
        {
            if (_.has(mapper, template) && mapper[template].model)
            {
                return mapper[template].model;
            }
            else
            {
                throw new Error('no template-model registered for: ' + template);
            }
        }
    };
});