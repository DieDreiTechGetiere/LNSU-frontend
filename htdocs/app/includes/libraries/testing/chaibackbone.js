(function() {
    
  (function(chaiBackbone) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
      return module.exports = chaiBackbone;
    } else if (typeof define === "function" && define.amd) {
      return define(function() {
        return chaiBackbone;
      });
    } else {
      return chai.use(chaiBackbone);
    }
  })(function(chai, utils) {
    var flag, inspect, routeTo;
    inspect = utils.inspect;
    flag = utils.flag;
    chai.Assertion.addMethod('trigger', function(trigger, options) {
      var definedActions;
      if (options == null) {
        options = {};
      }
      definedActions = flag(this, 'whenActions') || [];
      definedActions.push({
        negate: flag(this, 'negate'),
        before: function(context) {
          this.callback = sinon.spy();
          return flag(context, 'object').on(trigger, this.callback);
        },
        after: function(context) {
          var negate, _ref;
          negate = flag(context, 'negate');
          flag(context, 'negate', this.negate);
          context.assert(this.callback.called, "expected to trigger " + trigger, "expected not to trigger " + trigger);
          if (options["with"] != null) {
            context.assert((_ref = this.callback).calledWith.apply(_ref, options["with"]), "expected trigger to be called with " + (inspect(options["with"])) + ", but was called with " + (inspect(this.callback.args[0])) + ".", "expected trigger not to be called with " + (inspect(options["with"])) + ", but was");
          }
          return flag(context, 'negate', negate);
        }
      });
      return flag(this, 'whenActions', definedActions);
    });
    chai.Assertion.addProperty('route', function() {
      return flag(this, 'routing', true);
    });
    routeTo = function(router, methodName, options) {
      var consideredRouter, current_history, route, stub, _i, _len, _ref;
      if (options == null) {
        options = {};
      }
      if (!((typeof router === 'object') && (router instanceof Backbone.Router))) {
        throw new TypeError('provided router is not a Backbone.Router');
      }
      current_history = Backbone.history;
      Backbone.history = new Backbone.History;
      stub = sinon.stub(router, methodName);
      router._bindRoutes();
      if (options.considering != null) {
        _ref = options.considering;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          consideredRouter = _ref[_i];
          consideredRouter._bindRoutes();
        }
      }
      Backbone.history.root = '/';
      route = flag(this, 'object');
      Backbone.history.location = {
        pathname: '/'
      };
      Backbone.history.loadUrl(route);
      Backbone.history = current_history;
      router[methodName].restore();
      this.assert(stub.calledOnce, "expected `" + route + "` to route to " + methodName, "expected `" + route + "` not to route to " + methodName);
      if (options["arguments"] != null) {
        return this.assert(stub.calledWith.apply(stub, options["arguments"]), "expected `" + methodName + "` to be called with " + (inspect(options["arguments"])) + ", but was called with " + (inspect(stub.args[0])) + " instead", "expected `" + methodName + "` not to be called with " + (inspect(options["arguments"])) + ", but was");
      }
    };
    chai.Assertion.overwriteProperty('to', function(_super) {
      return function() {
        if (flag(this, 'routing')) {
          return routeTo;
        } else {
          return _super.apply(this, arguments);
        }
      };
    });
    return chai.Assertion.addMethod('call', function(methodName) {
      var definedActions, object;
      object = flag(this, 'object');
      definedActions = flag(this, 'whenActions') || [];
      definedActions.push({
        negate: flag(this, 'negate'),
        before: function(context) {
          this.originalMethod = object[methodName];
          this.spy = sinon.spy();
          object[methodName] = this.spy;
          return typeof object.delegateEvents === "function" ? object.delegateEvents() : void 0;
        },
        after: function(context) {
          object[methodName] = this.originalMethod;
          if (typeof object.delegateEvents === "function") {
            object.delegateEvents();
          }
          return context.assert(this.spy.callCount > 0, this.spy.printf("expected %n to have been called at least once"), this.spy.printf("expected %n to not have been called"));
        }
      });
      return flag(this, 'whenActions', definedActions);
    });
  });

}).call(this);