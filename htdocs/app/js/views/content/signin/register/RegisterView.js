

define(function(require){
    
    var Backbone = require("backbone");
    var Marionette = require("marionette");
    
    var app = require("app");
    var notification = require("notification");
    
    var RegisterView = Backbone.Marionette.ItemView.extend({
        
        /* @Properties ----------------------------------------------------------------------- */
        
        template: require("text!views/content/signin/register/RegisterView.html"),
        /**
         * 
         */
        rendered: false,
        
        
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        initialize: function()
        {
            this.listenTo(this.model, "change", this.render);
            
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
        }
    });
    
    return RegisterView;
})