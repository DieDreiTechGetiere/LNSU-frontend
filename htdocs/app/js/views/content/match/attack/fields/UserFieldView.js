

define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var UserFieldView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/match/attack/fields/userFieldView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        views: {
            
        },
        /**
         * 
         */
        ui: {
            
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.render();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            
        },
        
        
        /**
         * 
         */
        render: function()
        {
            if(!this.rendered)
            {
                var renderedTemplate = _.template(this.template)(this.model.toJSON());
                
                this.$el.html(renderedTemplate);
                this.rendered = true;
            }
            else
            {}
        },
        
        
        events: {
            
        }
    });
    return UserFieldView;
});