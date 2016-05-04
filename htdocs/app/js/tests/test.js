
define(function(require) {
    
    var chai = require("chai");
    var app = require("app");
    
    
    // VIEWS
    
    
    // MODELS
    var ApplicationModel = require("appModel");
    
    
    // START OF TESTS
    describe('Models', function() {
        
        describe('app.model', function(){
            
            it("should be an instance of ApplicationModel", function(){
                chai.expect(app.model).to.be.an.instanceof(ApplicationModel);
            });
            
            it("should trigger change on value change/set", function(){
                app.model.should.trigger("change").when(function() {
                    app.model.set({ attribute: "value" });
                });
            });
        });
        
        describe('GlobalEventsModel', function() {
            
            it('should show loader', function() {
                app.global.showLoader();
                
                setTimeout(function(){
                    $(".loader-pos").css("display").should.equal("block");
                }, 320);
            });
            
            it('should hide loader', function() {
                setTimeout(function(){
                    app.global.hideLoader();
                }, 350);
                
                //timeout because of the loader delay when hiding
                setTimeout(function(){
                    $(".loader-pos").css("display").should.equal("none");
                }, 500);
            });
        });
    });
    
    
    describe("user log in / user sign in", function(){
        
        describe("user log in", function(){
            
            it("logInView should have 2 errors (empty username and password)", function(){
                $(".login_form").trigger("submit");
                
                $.each($(".text"), function(){
                    $(this).css("outline").should.equal("rgb(255, 0, 0) solid 1px");
                });
            });
            /*
            it("logInView should have 1 error (empty username)", function(){
                $("#password").val("maier");
                $(".login_form").trigger("submit");
                console.log("pw: ", $("#password").val());
                // outline == 1px solid red
                $("#login_name").css("border").should.equal("rgb(255, 0, 0) solid 1px");
                $("#password").val("");

            });
            */
            it("logInView should have 1 error (empty password)", function(){
                $("#login_name").val("niklas");
                $(".login_form").trigger("submit");
                
                // outline == 1px solid red
                $("#password").css("border").should.equal("rgb(255, 0, 0) solid 1px");
                $("#login_name").val("");
            });
        });
        
        describe("user sign in", function(){
            
        });
    });
});