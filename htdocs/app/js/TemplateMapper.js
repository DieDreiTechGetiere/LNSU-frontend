/**
 * Created by nmaier on 28.08.15.
 */

define(function(require)
{
    var app = require('app');

    // VIEWS
    var ApplicationView = require("views/ApplicationView");
    
    // login
    var LoginView = require("views/content/signin/login/LoginView");
    var RegisterView = require("views/content/signin/register/RegisterView");
    var SigninView = require("views/content/signin/SigninView");
    
    // dashboard
    var DashboardView = require("views/content/dashboard/DashboardView");
    var AdminView = require("views/content/dashboard/admin/AdminView");
    var HighscoreView = require("views/content/dashboard/highscore/HighscoreView");
    var HighscoreItemView = require("views/content/dashboard/highscore/HighscoreItemView");
    var PlayerSearchView = require("views/content/dashboard/playersearch/PlayerSearchView");
    var ProfileView = require("views/content/dashboard/profile/ProfileView");
    var RecentGamesView = require("views/content/dashboard/recentgames/RecentGamesItemView");
    
    // match
    var MatchView = require("views/content/match/MatchView");
    var GridView = require("views/content/match/grid/GridView");
    var PlacementView = require("views/content/match/placement/PlacementView");
    var InfoView = require("views/content/match/placement/info/InfoView");
    var ShipView = require("views/content/match/ships/ShipView");
    var AttackView = require("views/content/match/attack/AttackView");
    var OpponentFieldView = require("views/content/match/attack/fields/OpponentFieldView");
    var UserFieldView = require("views/content/match/attack/fields/UserFieldView");
    var ControlsView = require("views/content/match/attack/controls/ControlsView");
    
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
        
        // dashboard
        dashboardView: {
            defaultView: DashboardView
        },
        adminView: {
            defaultView: AdminView
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
        },
        
        // match
        matchView: {
            defaultView: MatchView
        },
        gridView: {
            defaultView: GridView
        },
        placementView: {
            defaultView: PlacementView
        },
        infoView: {
            defaultView: InfoView
        },
        shipView: {
            defaultView: ShipView
        },
        attackView: {
            defaultView: AttackView
        },
        opponentFieldView: {
            defaultView: OpponentFieldView
        },
        userFieldView: {
            defaultView: UserFieldView
        },
        controlsView: {
            defaultView: ControlsView
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