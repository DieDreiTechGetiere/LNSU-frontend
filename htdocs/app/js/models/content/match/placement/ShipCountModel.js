
define(function(require){
    
    var app = require("app");
    var Backbone = require("backbone");
    var notification = require("notification");
    
    var ShipCountModel = Backbone.Model.extend({
        
        defaults:
        {
            ships: {
                ship_1: 4,
                ship_2: 3,
                ship_3: 2,
                ship_4: 1
            }
        },
        
        
        initialize: function()
        {
            this.listenTo(app.vent, notification.event.SHIP_COUNT_UPDATE, this.updateShipCount, this);
        },
        
        
        /**
         * updates the number of ships left
         * @param shipLength : int
         * @param counter : boolean (count positive or negative)
         */
        updateShipCount: function(shipLength, counter)
        {
            var shipsObj = this.get("ships"); 
            if(counter == true)
            {
                shipsObj["ship_" + shipLength] += 1;
                this.set("ships", shipsObj);
            }
            else if(counter == false)
            {
                shipsObj["ship_" + shipLength] -= 1;
                this.set("ships", shipsObj);
            }
            this.trigger("change");
        }
    });
    return ShipCountModel;
});