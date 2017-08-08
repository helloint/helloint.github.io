// EPG List
function EPGList(domId, options)
{
	var epgTemplate = '<li class="item">'
			+ '  <div class="title">{{title}}</div>'
			+ '  <a href="javascript:void(0);" class="play" data-starttime="{{startTime}}">Play</a>'
			+ '</li>';

	init();

	function init()
	{
		loadEPGFeed();
	}

	function loadEPGFeed()
	{
		var epgFeed = options.epgFeed.replace("{date}", formatDate(new Date()));
		window.getJSONPFeed(window.addTimestamp(epgFeed), "handleEPGCallback", handleEPGData);
	}

	function handleEPGData(data)
	{
		var epgArr = [];
		for (var i = 0; i < data[0].items.length; i++)
		{
			epgArr[epgArr.length] = {title: data[0].items[i].e, startTime: data[0].items[i].sl};
		}
		renderEPGUI(epgArr);
	}

	function renderEPGUI(epgArr)
	{
		var epgDom = "<ul>";
		for (var i = 0; i < epgArr.length; i++)
		{
			epgDom += epgTemplate.replace(/{{title}}/g, epgArr[i].title).replace(/{{startTime}}/g, epgArr[i].startTime);
		}
		epgDom += "</ul>";
		var container = document.getElementById(domId);
		container.innerHTML = epgDom;

		if (options.onPlayCallback)
		{
			var anchors = document.getElementById(domId).querySelectorAll(".play");
			for (var i = 0; i < anchors.length; i++)
			{
				(function (i)
				{
					anchors[i].onclick = function ()
					{
						options.onPlayCallback({startTime: anchors[i].getAttribute('data-starttime')})
					};
				})(i);
			}
		}
	}

	// Public APIs
	this.setActiveProgram = function (index)
	{
		var container = document.getElementById(domId);
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

	this.getProgramLength = function ()
	{
		var container = document.getElementById(domId);
		return container.querySelectorAll(".item").length;
	};

	// Utils	
	// yyyy/MM/dd
	function formatDate(date)
	{
		var year = date.getFullYear();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		day = day < 10 ? "0" + day : day;
		month = month < 10 ? "0" + month : month;
		return year + "/" + month + "/" + day;
	}
}