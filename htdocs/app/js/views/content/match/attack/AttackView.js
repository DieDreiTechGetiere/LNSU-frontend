
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var AttackView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/match/attack/attackView.html"),
        /**
         * 
         */
        rendered: false,
        /**
         * 
         */
        views: {
            OPPONENTFIELD: "gridView",
            USERFIELD: "gridView",
            CONTROLS: "controlsView"
        },
        /**
         * 
         */
        ui: {
            fields: ".game_fields",
            controls: ".controls_field"
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.render();
        },
        
        
        /**
         * 
         */
        initSubViews: function()
        {
            
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        
        /* @Finalize ------------------------------------------------------------------------- */
        
        finalize: function()
        {
            this.initSubViews();
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
    return AttackView;
});