// EPG Component
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
		epgDom += '<li class="item">';
		epgDom += '  <div class="title">' + epgArr[i].title + '</div>';
		epgDom += '  <a href="javascript:onPlayClick(\'' + epgArr[i].startTime + '\');">Play</a>';
		epgDom += '</li>';
	}
	epgDom += "</ul>";
	var container = document.getElementById("epgContainer");
	container.innerHTML = epgDom;
}
function setActiveEPGProgram(index)
{
	var container = document.getElementById("epgContainer");
	var prevSelectedEl = container.querySelectorAll(".selected");
	if (prevSelectedEl.length > 0)
	{
		removeClass(container.querySelectorAll(".selected")[0], "selected");
	}
	var elements = container.querySelectorAll(".item");
	if (index >= 0 && index < getEPGProgramLength())
	{
		addClass(elements[index], "selected");
	}
}
function getEPGProgramLength()
{
	var container = document.getElementById("epgContainer");
	return container.querySelectorAll(".item").length;
}
function onPlayClick(startTime)
{
	playProgram(startTime);
}