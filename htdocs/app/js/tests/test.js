
define(function(require) {
    
    var chai = require("chai");
    var app = require("app");
    var sinon = require("sinon");
    
    
    // VIEWS
    var ApplicationView = require("views/ApplicationView");
    
    // MODELS
    var ApplicationModel = require("appModel");
    
    
    // START OF TESTS
    describe('Basics', function() {
        
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
        
        describe("app.view", function(){
            it("should be an instance of ApplicationView", function(){
                chai.expect(app.view).to.be.an.instanceof(ApplicationView);
            });
        });
        
        describe('GlobalEventsModel', function() {
            it("should show loader", sinon.test(function () {
                app.global.showLoader();
                
                this.clock.tick(210);
                
                $(".loader-pos").css("display").should.equal("block");
            }));
            
            it('should hide loader', sinon.test(function() {
                app.global.hideLoader();
                
                this.clock.tick(400);
                
                $(".loader-pos").css("display").should.equal("none");
            }));
        });
    });
    

    describe("user log in / user sign in", function(){
        
        describe("user log in", function(){
            
            it("logInView should have 2 errors (empty username and password)", function(){
                $(".login_form").trigger("submit");
                
                $.each($(".textfield"), function(){
                    $(this).css("border").should.equal("1px solid rgb(255, 0, 0)");
                });
            });
            
            it("logInView should have 1 error (empty username)", function(){
                $("#password").val("asd");
                $(".button").trigger("click");
                
                // outline == 1px solid red
                $("#login_name").css("border").should.equal("1px solid rgb(255, 0, 0)");
                $("#password").val("");

            });
            
            it("logInView should have 1 error (empty password)", function(){
                $("#login_name").val("dsa");
                $(".button").trigger("click");
                
                // outline == 1px solid red
                $("#password").css("border").should.equal("1px solid rgb(255, 0, 0)");
                $("#login_name").val("");
            });
        });
        
        describe("user sign in", function(){
            it("should switch to registerview", sinon.test(function() {
                $(".switch_link").trigger("click");
                
                this.clock.tick(400);
                
                $("#signin_region div").first().attr("id").should.equal("registerView");
            }));
            
            it("logInView should have 4 errors", function(){
                $(".button").trigger("click");
                
                // outline == 1px solid red
                _.each($(".textfield"), function(item){
                    $(item).css("border").should.equal("1px solid rgb(255, 0, 0)");
                });
            });
            
            it("should reset all borders after switching login/register back and forth",  sinon.test(function() {
                //switch back to login and back again to registration
                $(".switch_link").trigger("click");
                this.clock.tick(400);
                $(".switch_link").trigger("click");
                this.clock.tick(400);
                
                // outline == 1px solid red
                _.each($(".textfield"), function(item){
                    $(item).css("border").should.not.equal("1px solid rgb(255, 0, 0)");
                });
            }));
            
            it("should have 2 errors at two random formular elements", function(){
                //this.timeout(100);
                var getRandomNum = function(){
                        return Math.floor((Math.random() * 3) + 0);
                    },
                    num1 = getRandomNum(),
                    num2 = getRandomNum(),
                    checkForSame = function()
                    {
                        if(num1 == num2)
                        {
                            num2 = getRandomNum();
                            checkForSame();
                        }
                    };
                
                checkForSame();
                _.each($(".textfield"), function(item, i){
                    if(i == num1 || i == num2)
                    {
                        $(item).val("lorem testing");
                    }
                });
                $(".button").trigger("click");
                _.each($(".textfield"), function(item, i){
                    if(i !== num1 && i !== num2)
                    {
                        $(item).css("border").should.equal("1px solid rgb(255, 0, 0)");
                    }
                });
            });
            
            it("should not allow 2 different passwords when registrating", function(){
                $("#login_name").val("lorem test");
                $("#ingame_name").val("lorem test");
                $("#password").val("loremtest");
                $("#password_repeat").val("differentTest");
                
                $(".button").trigger("click");
                
                $(".register_form").find(".error").html().should.equal("your given passwords dont match");
                $("#password").css("border").should.equal("1px solid rgb(255, 0, 0)");
                $("#password_repeat").css("border").should.equal("1px solid rgb(255, 0, 0)");
                
                startDashboard();
            });
        });
    });
    
    var startDashboard = function(){
        describe("Dashboard", function(){
            
            it("should log me in, to route /#dashboard ( as admin user )", function(){
                //login with valid user
                $(".switch_link").trigger("click");
                
                setTimeout(function(){
                    $("#login_name").val("h");
                    $("#password").val("h");
                    
                    $(".button").trigger("click");
                    
                    
                },400);
                this.timeout(600);
                window.location.hash.should.equal("#dashboard");
            });
        });
    }
});