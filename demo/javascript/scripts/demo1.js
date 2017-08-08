// EPG Component
function loadEPGFeed()
{
	getJSONPFeed(addTimestamp(EPG_FEED), "handleEPGCallback", handleEPGData);
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
		epgDom += '<li class="item">';
		epgDom += '  <div class="title">' + epgArr[i].title + '</div>';
		epgDom += '  <a href="javascript:onPlayClick(\'' + epgArr[i].startTime + '\');">Play</a>';
		epgDom += '</li>';
	}
	epgDom += "</ul>";
	var container = document.getElementById("epgContainer");
	container.innerHTML = epgDom;
}
function onPlayClick(startTime)
{
	playProgram(startTime);
}