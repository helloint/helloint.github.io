// EPG Component
// Entry
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
	var source = document.getElementById("epgTemplate").innerHTML;
	var template = Handlebars.compile(source);
	var container = document.getElementById("epgContainer");
	container.innerHTML = template({epgArr: epgArr});
}
function onPlayClick(startTime)
{
	playProgram(startTime);
}