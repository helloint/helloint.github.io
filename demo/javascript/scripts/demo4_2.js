(function ()
{
	// EPG List
	var EPGList = function (domId, options)
	{
		this.domId = domId;
		this.options = {};
		for (var item in options)
		{
			this.options[item] = options[item];
		}
		this.init();
	};

	EPGList.prototype.epgTemplate = '<li class="item">'
			+ '  <div class="title">{{title}}</div>'
			+ '  <a href="javascript:void(0);" class="play" data-starttime="{{startTime}}">Play</a>'
			+ '</li>';

	EPGList.prototype.init = function ()
	{
		this.loadEPGFeed();
	};

	EPGList.prototype.loadEPGFeed = function ()
	{
		var self = this;

		var epgFeed = this.options.feed.replace("{date}", window.formatDate(new Date()));
		window.getJSONPFeed(window.addTimestamp(epgFeed), "handleEPGCallback", function (data)
		{
			self.handleEPGData(data);
		});
	};

	EPGList.prototype.handleEPGData = function (data)
	{
		var epgArr = [];
		for (var i = 0; i < data[0].items.length; i++)
		{
			epgArr[epgArr.length] = {title: data[0].items[i].e, startTime: data[0].items[i].sl};
		}
		this.renderEPGUI(epgArr);
	};

	EPGList.prototype.renderEPGUI = function (epgArr)
	{
		var self = this;

		var epgDom = "<ul>";
		for (var i = 0; i < epgArr.length; i++)
		{
			epgDom += this.epgTemplate.replace(/{{title}}/g, epgArr[i].title).replace(/{{startTime}}/g, epgArr[i].startTime);
		}
		epgDom += "</ul>";
		var container = document.getElementById(this.domId);
		container.innerHTML = epgDom;

		if (this.options.onPlayCallback)
		{
			var anchors = document.getElementById(self.domId).querySelectorAll(".play");
			for (var i = 0; i < anchors.length; i++)
			{
				(function (i)
				{
					anchors[i].onclick = function ()
					{
						self.options.onPlayCallback({startTime: anchors[i].getAttribute('data-starttime')})
					};
				})(i);
			}
		}
	};

	// Public APIs
	EPGList.prototype.setActiveProgram = function (index)
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
	};

	EPGList.prototype.getProgramLength = function ()
	{
		var container = document.getElementById(this.domId);
		return container.querySelectorAll(".item").length;
	};

	window.EPGListUI = function ()
	{
		return function (domId, options)
		{
			var epgList = new EPGList(domId, options);
			this.setActiveProgram = function (index)
			{
				epgList.setActiveProgram.call(epgList, index);
			};
			this.getProgramLength = function ()
			{
				return epgList.getProgramLength.call(epgList);
			};
		};
	}();
})(window);

(function ()
{
	window.EPGListFactory = (function ()
	{
		var instance;

		function createInstance(domId, options)
		{
			var object = new window.EPGListUI(domId, options);
			return object;
		}

		return {
			getInstance: function (domId, options)
			{
				if (!instance)
				{
					instance = createInstance(domId, options);
				}
				return instance;
			}
		};
	})();
})(window);