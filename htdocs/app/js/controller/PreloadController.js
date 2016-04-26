
define(function (require)
{
	//@imports-------------------------------------------------------------------------
	var Marionette = require('marionette');
	var app = require('app');
	var settings = require('settings');
	var notification = require('notification');

	/**
    * @class definition-----------------------------------------------------------------
    */
	var PreloadController = Marionette.Controller.extend({
		//@props------------------------------------------------------------------------  

		//@methods----------------------------------------------------------------------
		/**
		*
		*/
		initialize: function(options)
		{
			this.startQueue = new createjs.LoadQueue();
			this.startQueue.setMaxConnections(100);
			this.startQueue.on("fileload", this.onStartQueueFileload, this);
			this.startQueue.on("complete", this.onStartQueueComplete, this);
			this.startQueue.on("progress", this.onStartQueueProgress, this);
			this.startQueue.on("error", this.onError, this);
			this.targets = [];
		},

		/**
		*
		*/
		onError: function(event)
		{
			app.log.error('error when loading image', event);
		},

		/**
		*
		*/
		onStartQueueProgress: function(event)
		{
        //    console.log("onProgress");
		//	app.vent.trigger(notification.event.application.QUEUE_PROGRESS, event.progress.toFixed(2));
		},

		/**
		*
		*/
		onStartQueueFileload: function(event)
		{
			if (event.item.type == createjs.LoadQueue.IMAGE && event.item.data && event.item.data.targetID)
			{
				var $result = (app.isFallback) ?  jQuery('<img src="' + event.item.src + '">') : jQuery(event.result);
				var $target = this.targets[event.item.data.targetID - 1];
				$target.empty();
				$target.append($result);
			}
		},

		/**
		*
		*/
		onStartQueueComplete: function(event)
		{
            app.log.info("startQueue loaded");
			app.vent.trigger(notification.event.SECTION_READY);
		},

		/**
		*
		*/
		addToStartQueue: function(source, id, $target, data)
		{
			var mergedData = data || {};
			if ($target)
			{
				this.targets.push($target);
				mergedData = _.extend(mergedData, {targetID: this.targets.length});
			}
			this.startQueue.loadFile({src: settings.imagesPath + source, id: "image"}, false);
		},

		/**
		*
		*/
		loadStartQueue: function()
		{
			this.startQueue.load();
		},

		/**
		*
		*/
		getFromStartQueue: function(sourceOrID)
		{
			return this.startQueue.getResult(settings.imagesPath + sourceOrID);
		},

		/**
		*
		*/
		getSlideshowListFromStartQueue: function(sourceOrID)
		{				
			var obj = 	$("<li/>");
			var inner ="<img class='slideShowFallback' src='"+settings.imagesPath+sourceOrID+"' />";
			obj.append(inner);
			return obj;
		}
	});

	return PreloadController;
});