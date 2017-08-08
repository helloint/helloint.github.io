// EPG List
var EPGList = function (domId, options)
{
	this.domId = domId;
	this.options = {};
	for (var item in options)
	{
		this.options[item] = options[item];
	}
	this._init();
};

EPGList.prototype.epgTemplate = '<li class="item">'
		+ '  <div class="title">{{title}}</div>'
		+ '  <a href="javascript:void(0);" class="play" data-starttime="{{startTime}}">Play</a>'
		+ '</li>';

EPGList.prototype._init = function ()
{
	this._loadEPGFeed();
};

EPGList.prototype._loadEPGFeed = function ()
{
	var self = this;

	var epgFeed = this.options.epgFeed.replace("{date}", window.formatDate(new Date()));
	window.getJSONPFeed(window.addTimestamp(epgFeed), "handleEPGCallback", function (data)
	{
		self._handleEPGData(data);
	});
};

EPGList.prototype._handleEPGData = function (data)
{
	var epgArr = [];
	for (var i = 0; i < data[0].items.length; i++)
	{
		epgArr[epgArr.length] = {title: data[0].items[i].e, startTime: data[0].items[i].sl};
	}
	this._renderEPGUI(epgArr);
};

EPGList.prototype._renderEPGUI = function (epgArr)
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