define(function(require) {
    
    var app = require("app");
    
    
    var SpecRunner = 
    {
        start: function()
        {
            app.log.info("tests running");
            
            var chai = require('chai');
            require('mocha');
            require('jquery');
            var chaiJquery = require('chai-jquery');
            var chaiChanges = require("chaiChanges");
            var chaiBackbone = require("chaibackbone");

            // Chai
            var should = chai.should();
            var expect = chai.expect();
            
            chai.use(chaiJquery);
            chai.use(chaiChanges);
            chai.use(chaiBackbone);
            mocha.setup('bdd');

            require([
                'testsFile',
            ], function(require) {
                mocha.run();
            });
        }
    }
    
    return SpecRunner;
    //hide application
    //$(".main-stage").css("display", "none");
});