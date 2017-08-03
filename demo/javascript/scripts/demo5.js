// EPG List
function EPGList(domId, options)
{
	var epgFeed = "https://neulionsmbnyc-a.akamaihd.net/u/mt1/elevensportssg/epg/eleven/2017/08/02.js";
	var epgTemplate = '<li class="item">'
			+ '  <div class="title">{{title}}</div>'
			+ '  <a href="javascript:void(0);" class="play" data-starttime="{{startTime}}">Play</a>'
			+ '</li>';

	loadEPGFeed();

	function loadEPGFeed()
	{
		getJSONPFeed(addTimestamp(epgFeed), "handleEPGCallback", handleEPGData);
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
				(function(i){
					anchors[i].onclick = function() {
						options.onPlayCallback({startTime: anchors[i].getAttribute('data-starttime')})
					};
				})(i);
			}
		}
	}
}