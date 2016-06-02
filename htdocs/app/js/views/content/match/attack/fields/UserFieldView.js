

define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
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
            gamefield: ".user_field",
        },


        /* @Initialize ----------------------------------------------------------------------- */

        initialize: function()
        {
            this.listenTo(this.model, "change:hits", this.showHits, this);
            this.listenTo(this.model, "change:misses", this.showMisses, this);
            this.render();
        },
        
        
        /**
         * 
         */
        initSubViews: function()
        {
            this.initGridView();
            this.initUserShips();
        },
        
        
        /**
         * 
         */
        initGridView: function()
        {
            app.execute(notification.command.match.INIT_GRID, ".user_field", "userField");
        },
        
        
        /**
         * 
         */
        initUserShips: function()
        {
            $(this.ui.gamefield).append(app.placedShips.el);
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        
        /**
         * 
         */
        showHits: function()
        {
            console.log("showHits(): " + this.model.get("hits"));
            $(".button.userFieldView").trigger("click");
            
            var self = this;
            setTimeout(function(){
                for(var e = 0; e < self.model.get("hits").length; e++)
                {
                    console.log("showHit: ", e);
                    self.$(".field_" + self.model.get("hits")[e]["x"] + "_" + self.model.get("hits")[e]["y"] + "").addClass("hit");
                }
            }, 310);
            
        },
        
        
        /**
         * 
         */
        showMisses: function()
        {
            console.log("showMisses(): ", this.model.get("misses")[0]["x"]);
            //$("#userField").find(;
            this.$(".field_" + this.model.get("misses")[0]["x"] + "_" + this.model.get("misses")[0]["y"]).addClass("water")
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
            
        }
    });
    return UserFieldView;
});