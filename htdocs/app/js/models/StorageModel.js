
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var StorageModel = Backbone.Model.extend({
        
        localStorage: new Backbone.LocalStorage("lnsu-storage"),
        
        id: 1, //necessary to prevent doublettes in LocalStorage (actually this StorageClass is for collections)
        
        defaults: {
            ingameName: null,
            loginName: null,
            role: null,
            userId: null,
            logginTime: null
        },
        
        /* @Initialize ----------------------------------------------------------------------- */
        
        initialize: function()
        {
            this.fetch();
        },
        
        
        /**
         * 
         */
        fetch: function() {
            this.set(JSON.parse(localStorage.getItem("lnsu-storage-" + this.id)));
        },
        
        
        /* @Methods -------------------------------------------------------------------------- */
        
        checkIfUserIsLoggedIn: function()
        {
            if(this.get("logginTime") != null)
            {
                var now = new Date(this.get("logginTime"));
            //    console.log("now: ", now, " getTime: ", now.getTime(), " gettime+1: ", now.getTime() + 3600);
                if(now.getTime() > now.getTime() + 3600)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else
            {
                return false;
            }
        },
        
        
        /**
         * 
         */
        destroy: function(options) 
        {
            localStorage.removeItem(this.id);
        },

        
        /**
         * 
         */
        isEmpty: function() 
        {
            return (_.size(this.attributes) <= 1); // just 'id'
        },
        
    });
    return StorageModel;
})