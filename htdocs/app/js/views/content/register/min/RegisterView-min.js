define(function(e){var t=e("backbone"),i=e("marionette"),n=e("app"),r=e("notification"),a=t.Marionette.ItemView.extend({template:e("text!views/content/register/RegisterView.html"),rendered:!1,initialize:function(){this.listenTo(this.model,"change",this.render),this.render()},finalize:function(){},render:function(){if(!this.rendered){var e=_.template(this.template)(this.model.toJSON());this.$el.append(e),this.rendered=!0}}});return a});