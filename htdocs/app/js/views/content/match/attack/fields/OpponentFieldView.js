

define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
    var OpponentFieldView = Backbone.Marionette.ItemView.extend({
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/match/attack/fields/opponentFieldView.html"),
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
            koordinate: ".field"
        },
        clickSample: "hit",


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
            this.initGridView();
        },
        
        
        /**
         * 
         */
        initGridView: function()
        {
            app.execute(notification.command.match.INIT_GRID, ".opponent_field", "opponentField");
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        clickKoordinate: function(e)
        {   
            //TODO allow only if matchModel.myTurn == true
            $(e.currentTarget).addClass(this.clickSample);
            this.clickSample = this.clickSample == "hit" ? "water" : "hit";
            
            var coordinates = 
            {
                x : $(e.currentTarget).data("x"),
                y : $(e.currentTarget).data("y")
            };
            
            this.model.set("shotCoordinates", coordinates);
        },
        
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
            "click @ui.koordinate": "clickKoordinate"
        }
    });
    return OpponentFieldView;
});