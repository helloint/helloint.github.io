// EPG Component
var epgFeed = "https://neulionsmbnyc-a.akamaihd.net/u/mt1/elevensportssg/epg/eleven/2017/08/02.js";
// Entry
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
	var source = document.getElementById("epgTemplate").innerHTML;
	var template = Handlebars.compile(source);
	var container = document.getElementById("epgContainer");
	container.innerHTML = template({epgArr: epgArr});
}
function onPlayClick(startTime)
{
	playProgram(startTime);
}