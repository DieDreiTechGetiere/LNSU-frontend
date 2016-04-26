
/**
 * Created by nmaier on 17.07.15.
 */


define(function(require)
{
    var app = require("app");
    var settings = require("settings");
    var notification = require("notification");

    var PreloadCommand = {
        //@methods----------------------------------------------------------------------
        
        images: 
        [
            "close-btn.png",
            "favicon.png",
        //    "Kreuzer_1-min.jpg",
            "lnsu_background.jpg",
            "loader_icon.png",
            "logo.png",
            "logo.jpg",
            "minus_icon.png",
            "plus_icon.png",
            "right_arrow.png",
            "square.png",
            "steuerrad.png",
            "wins_icon.png",
            "moewe.png",
            "fisch.png",
            "dreizack.png",
            
            "profilepictures/flottenadmiral.png",
            "profilepictures/fregattenkapitaen.png",
            "profilepictures/hauptbootsmann.png",
            "profilepictures/kartoffelschaeler.png",
            "profilepictures/latrinenputzer.png",
            "profilepictures/matrose.png",
            "profilepictures/oberlieutenant.png",
            "profilepictures/obermaat.png",
            "profilepictures/seekadett.png",
            "profilepictures/stabsgefreiter.png",
            
            "ranks/flottenadmiral.png",
            "ranks/fregattenkapitaen.png",
            "ranks/hauptbootsmann.png",
            "ranks/matrose.png",
            "ranks/oberlieutenant.png",
            "ranks/obermaat.png",
            "ranks/seekadett.png",
            "ranks/stabsgefreiter.png", 
            
            "ships/ship_1.png",
            "ships/ship_2.png",
            "ships/ship_2_v.png",
            "ships/ship_3.png",
            "ships/ship_3_v.png",
            "ships/ship_4.png",
            "ships/ship_4_v.png",
        ],

        initialize: function()
        {
            this.addImagesToLoadQueue();
            app.preload.loadStartQueue();
        },
        
        
        addImagesToLoadQueue: function()
        {
            for(var i = 0; i < this.images.length; i++)
            {
                app.preload.addToStartQueue(this.images[i]);
            }
        }
    };
    return PreloadCommand;
});