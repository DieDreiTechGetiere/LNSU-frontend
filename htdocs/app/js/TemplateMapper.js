/**
 * Created by nmaier on 28.08.15.
 */

define(function(require)
{
    var app = require('app');

    // VIEWS
    var ApplicationView = require("views/ApplicationView");
    var LoginView = require("views/content/login/LoginView");

    // MODELS


    var mapper = {
        applicationView: {
            defaultView: ApplicationView
        },
        loginView: {
            defaultView: LoginView
        },
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