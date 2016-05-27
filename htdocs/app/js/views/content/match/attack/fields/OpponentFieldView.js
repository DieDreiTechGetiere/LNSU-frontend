

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
            this.listenTo(this.model, "hit", this.handleHit, this);
            this.listenTo(this.model, "miss", this.handleMiss, this);
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
        
        
        /**
         * set clicked coordinate in model,
         * model send data on "y:change" to server, so always set y second
         */
        clickKoordinate: function(e)
        {   
            if(app.matchModel.get("myTurn") == true)
            {
                app.global.showLoader();
                $(e.currentTarget).addClass("active");
                
                this.model.set("x", $(e.currentTarget).data("x"));
                this.model.set("y", $(e.currentTarget).data("y"));
            }
            else
            {
                app.execute(notification.command.application.OPEN_OVERLAY, "notYourTurn");
            }
        },
        
        
        /**
         * add hit icon to the clicked field
         * remove aim icon from clicked field
         */
        handleHit: function(a, b)
        {
            console.log("handleHit a: ", a, "b: ", b);
            $(".field_" + this.model.get("x") + "_" + this.model.get("y")).removeClass("active").addClass("hit");
        },
        
        
        /**
         * add miss icon to the clicked field
         * remove aim icon from clicked field
         */
        handleMiss: function(a, b)
        {
            console.log("handleMiss a: ", a, "b: ", b);
            $(".field_" + this.model.get("x") + "_" + this.model.get("y")).removeClass("active").addClass("water");
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