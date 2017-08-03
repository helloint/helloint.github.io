// EPG Component
var epgList = {
	epgFeed: "https://neulionsmbnyc-a.akamaihd.net/u/mt1/elevensportssg/epg/eleven/2017/08/02.js",
	epgTemplate: '<li class="item">'
	+ '  <div class="title">{{title}}</div>'
	+ '  <a href="javascript:epgList.onPlayClick(\'{{startTime}}\');">Play</a>'
	+ '</li>',

	// Entry
	loadEPGFeed: function()
	{
		var self = this;
		window.getJSONPFeed(window.addTimestamp(this.epgFeed), "handleEPGCallback", function(data){
			self.handleEPGData(data);
		});
	},
	handleEPGData: function (data)
	{
		var epgArr = [];
		for (var i = 0; i < data[0].items.length; i++)
		{
			epgArr[epgArr.length] = {title: data[0].items[i].e, startTime: data[0].items[i].sl};
		}
		this.renderEPGUI(epgArr);
	},
	renderEPGUI: function (epgArr)
	{
		var epgDom = "<ul>";
		for (var i = 0; i < epgArr.length; i++)
		{
			epgDom += this.epgTemplate.replace(/{{title}}/g, epgArr[i].title).replace(/{{startTime}}/g, epgArr[i].startTime);
		}
		epgDom += "</ul>";
		var container = document.getElementById("epgContainer");
		container.innerHTML = epgDom;
	},
	onPlayClick: function(startTime)
	{
		window.playProgram(startTime);
	}
};