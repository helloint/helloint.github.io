// Utilities
/* Ajax Operation */
/**
 * Load a Javascript. This is an alternative of jQuery.getScript in native JavaScript
 * @param url
 * @param callback
 */
function getScript(url, callback)
{
	var script = document.createElement('script');
	var prior = document.getElementsByTagName('script')[0];
	script.async = 1;
	prior.parentNode.insertBefore(script, prior);

	script.onload = script.onreadystatechange = function (_, isAbort)
	{
		if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState))
		{
			script.onload = script.onreadystatechange = null;
			script = undefined;

			if (!isAbort)
			{
				if (callback) callback();
			}
		}
	};

	script.src = url;
}

/**
 * Load a named JSONP feed.
 * @param url
 * @param funcName  The function name hardcoded in jsonp feed
 * @param callback
 */
function getJSONPFeed(url, funcName, callback)
{
	if (window.__jsonFeedCache === undefined)
	{
		window.__jsonFeedCache = {};
	}
	if (window[funcName] === undefined)
	{
		window[funcName] = function (data)
		{
			__jsonFeedCache[funcName] = data;
		};
	}
	getScript(url, function ()
	{
		callback(__jsonFeedCache[funcName]);
	});
}

/**
 * Load a javascript feed and the data is defined in the feed as a global object.
 * @param url
 * @param objName   The objName hardcoded in JS feed
 * @param callback
 */
function getJSFeed(url, objName, callback)
{
	getScript(url, function ()
	{
		callback(window[objName]);
	});
}

/**
 * It can be used to get json API/Service in same domain, or different domain with CORS support.
 * This is an alternative to jQuery.getJSON()
 * @param url
 * @param callback
 * @param errCallback
 */
function getJSON(url, callback, errCallback)
{
	var request = new XMLHttpRequest();
	request.open('GET', url, true);

	request.onload = function ()
	{
		if (request.status >= 200 && request.status < 400)
		{
			// Success!
			var data = JSON.parse(request.responseText);
			if (callback) callback(data);
		}
		else
		{
			// We reached our target server, but it returned an error
		}
	};

	request.onerror = function ()
	{
		// There was a connection error of some sort
		if (errCallback) errCallback();
	};

	request.send();
}

/**
 * Add timestamp to url to avoid being cached by browser.
 * Note: param 'round' is not required to NeuLion CDN anymore because our CDN will ignore param.t
 *       Before we use 'round' to let the request URL to be the same one during a short time window,
 *       to avoid CDN requesting original server too frequently.
 * @param url
 * @param round
 * @returns {string}
 */
function addTimestamp(url, round)
{
	return url + (url.indexOf('?') > -1 ? '&' : '?') + 't=' + parseInt(new Date().getTime() / (round ? round * 1000 : 1));
}

/* Dom Operation */
function addClass(el, className)
{
	if (el.classList)
		el.classList.add(className);
	else
		el.className += ' ' + className;
}

function removeClass(el, className)
{
	if (el.classList)
		el.classList.remove(className);
	else
		el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

/* Date functions */
/**
 * Convert date object to date string in format: yyyy/MM/dd
 * @param date
 * @returns {string}
 */
function formatDate(date)
{
	var year = date.getFullYear();
	var day = date.getDate();
	var month = date.getMonth() + 1;
	day = day < 10 ? "0" + day : day;
	month = month < 10 ? "0" + month : month;
	return year + "/" + month + "/" + day;
}