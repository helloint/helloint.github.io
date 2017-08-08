// EPG Component
var epgTemplate = '<li class="item">'
		+ '  <div class="title">{{title}}</div>'
		+ '  <a href="javascript:onPlayClick(\'{{startTime}}\');">Play</a>'
		+ '</li>';

function loadEPGFeed()
{
	getJSONPFeed(addTimestamp(window.EPG_FEED), "handleEPGCallback", handleEPGData);
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
	var container = document.getElementById("epgContainer");
	container.innerHTML = epgDom;
}
function onPlayClick(startTime)
{
	playProgram(startTime);
}
