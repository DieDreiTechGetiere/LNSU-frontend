
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    var notification = require("notification");
    
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
        viewInstances: new Array(),
        /**
         * 
         */
        views: {
            OPPONENTFIELD: "opponentFieldView",
            USERFIELD: "userFieldView",
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
            this.listenTo(app.vent, notification.event.SWITCH_GAME_FIELDS, this.switchGameFields, this);
            this.render();
        },
        
        
        /**
         * 
         */
        initSubViews: function()
        {
            this.initOpponentField();
            this.initUserField();
            this.initControlsView();
            
            this.whatGridFirst();
        },
        
        
        /**
         * 
         */
        whatGridFirst: function()
        {
            $("#" + this.views.USERFIELD).css("visibility", "visible");
            $(".button." + this.views.USERFIELD).removeClass("passive");
        },
        
        
        /**
         * 
         */
        initOpponentField: function()
        {
            var OpponentField = app.mapper.getViewFor(this.views.OPPONENTFIELD);
            this.viewInstances[this.views.OPPONENTFIELD] = new OpponentField({
                id: this.views.OPPONENTFIELD,
                className: "opponent_field_view",
                model: this.model.get("opponentField")
            });
            $(this.ui.fields).append(this.viewInstances[this.views.OPPONENTFIELD].$el);
            this.viewInstances[this.views.OPPONENTFIELD].finalize();
        },
        
        
        /**
         * 
         */
        initUserField: function()
        {
            var UserFieldView = app.mapper.getViewFor(this.views.USERFIELD);
            this.viewInstances[this.views.USERFIELD] = new UserFieldView({
                id: this.views.USERFIELD,
                className: "user_field_view",
                model: this.model.get("userField")
            });
            $(this.ui.fields).append(this.viewInstances[this.views.USERFIELD].$el);
            this.viewInstances[this.views.USERFIELD].finalize();
        },
        
        
        /**
         * 
         */
        initControlsView: function()
        {
            var ControlsView = app.mapper.getViewFor(this.views.CONTROLS);
            this.viewInstances[this.views.CONTROLS] = new ControlsView({
                id: this.views.CONTROLS,
                className: "controls_view",
                model: this.model.get("controls")
            });
            $(this.ui.controls).html(this.viewInstances[this.views.CONTROLS].el);
            this.viewInstances[this.views.CONTROLS].finalize();
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        switchGameFields: function(activeField)
        {
            passiveField = activeField == "#opponentFieldView" ? "#userFieldView" : "#opponentFieldView";
            
            TweenMax.to($(passiveField), 0.3, {autoAlpha: 0, onComplete: function(){
                TweenMax.to($(activeField), 0.3, {autoAlpha: 1});
            }});
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
    return AttackView;
});