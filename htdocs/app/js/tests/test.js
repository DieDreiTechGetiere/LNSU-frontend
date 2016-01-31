
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
                
                $(".loader-pos").css("display").should.equal('block');
            });
            
            it('should hide loader', function() {
                app.global.hideLoader();
                
                //timeout because of the loader delay when hiding
                setTimeout(function(){
                    $(".loader-pos").css("display").should.equal('none');
                }, 110);
            });
        });
    });
    
    describe("user log in / user sign in", function(){
        
        describe("user log in", function(){
            
            it("logInView should have 2 errors (empty username and password)", function(){
                $(".login-form").trigger("submit");
                
                $.each($(".text"), function(){
                    $(this).css("outline").should.equal("rgb(255, 0, 0) solid 1px");
                });
            });
            
            it("logInView should have 1 error (empty username)", function(){
                $("#password").val("maier");
                $(".login-form").trigger("submit");
                
                // outline == 1px solid red
                $("#username").css("outline").should.equal("rgb(255, 0, 0) solid 1px");
                $("#password").val("");
            });
            
            it("logInView should have 1 error (empty password)", function(){
                $("#username").val("niklas");
                $(".login-form").trigger("submit");
                
                // outline == 1px solid red
                $("#password").css("outline").should.equal("rgb(255, 0, 0) solid 1px");
                $("#username").val("");
            });
        });
        
        describe("user sign in", function(){
            
        });
    });
});