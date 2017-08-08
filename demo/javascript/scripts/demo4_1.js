// EPG Component
(function ()
{
	var EPGList = {
		domId: null,
		template: '<li class="item">'
		+ '  <div class="title">{{title}}</div>'
		+ '  <a href="javascript:EPGList.handlePlayClick(\'{{startTime}}\');">Play</a>'
		+ '</li>',
		onPlayClick: null,

		init: function (domId, options)
		{
			this.domId = domId;
			this.feed = options.feed;
			this.onPlayClick = options.onPlayCallback;

			this.loadFeed();
		},

		loadFeed: function ()
		{
			var self = this;
			window.getJSONPFeed(window.addTimestamp(this.feed), "handleEPGCallback", function (data)
			{
				self.handleData(data);
			});
		},
		handleData: function (data)
		{
			var epgArr = [];
			for (var i = 0; i < data[0].items.length; i++)
			{
				epgArr[epgArr.length] = {title: data[0].items[i].e, startTime: data[0].items[i].sl};
			}
			this.renderUI(epgArr);
		},
		renderUI: function (epgArr)
		{
			var epgDom = "<ul>";
			for (var i = 0; i < epgArr.length; i++)
			{
				epgDom += this.template.replace(/{{title}}/g, epgArr[i].title).replace(/{{startTime}}/g, epgArr[i].startTime);
			}
			epgDom += "</ul>";
			var container = document.getElementById(this.domId);
			container.innerHTML = epgDom;
		},
		setActiveProgram: function (index)
		{
			var container = document.getElementById(this.domId);
			var prevSelectedEl = container.querySelectorAll(".selected");
			if (prevSelectedEl.length > 0)
			{
				window.removeClass(container.querySelectorAll(".selected")[0], "selected");
			}
			var elements = container.querySelectorAll(".item");
			if (index >= 0 && index < this.getProgramLength())
			{
				window.addClass(elements[index], "selected");
			}
		},
		getProgramLength: function ()
		{
			var container = document.getElementById(this.domId);
			return container.querySelectorAll(".item").length;
		},
		handlePlayClick: function (startTime)
		{
			if (this.onPlayClick)
			{
				this.onPlayClick({
					startTime: startTime
				});
			}
		}
	};

	window.EPGList = function ()
	{
		return {
			init: function (domId, options)
			{
				EPGList.init(domId, options);
			},
			setActiveProgram: function (index)
			{
				EPGList.setActiveProgram(index);
			},
			getProgramLength: function ()
			{
				return EPGList.getProgramLength();
			},
			handlePlayClick: function (startTime)
			{
				EPGList.handlePlayClick(startTime);
			}
		};
	}();
})();
