

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
            console.log("showHits()");
            $(".button.userFieldView").trigger("click");
            
            var self = this;
            setTimeout(function(){
                for(e in self.model.get("hits"))
                {
                    self.$(".field_" + self.model.get("hits")[e][0] + "_" + self.model.get("hits")[e][1] + "").addClass("hit");
                }
            }, 310);
            
        },
        
        
        /**
         * 
         */
        showMisses: function()
        {
            $("#userField").find(".field_" + this.model.get("x") + "_" + this.model.get("y")).addClass("water");
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