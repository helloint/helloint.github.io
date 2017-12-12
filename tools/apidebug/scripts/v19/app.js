var username = null;
var domainCookieName = "domain_v4";
var emailCookieName = "email_v4";
function login(callback)
{
	$.removeCookie("JSESSIONID");
	var email = $("#email").val();
	if (!email)
	{
		alert("Please input email");
		return;
	}
	$("#loginArea .result").empty();
	API.callLogin(email, function ()
	{
		$.cookie(emailCookieName, email, {expires: 7});
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}
function logout(callback)
{
	$("#loginArea .result").empty();
	API.callLogout(function ()
	{
		username = null;
		if ($.isFunction(callback)) {
			callback();
		}
	});
}

function register(callback)
{
	if (username != null)
	{
		alert("Please Logout first");
		return;
	}
	var email = $("#email").val();
	if (!email)
	{
		alert("Please input email");
		return;
	}
	$("#registerArea .result").empty();
	API.callRegistration(email, function ()
	{
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function subscribe(callback)
{
	if (username = null)
	{
		alert("Please Login first");
		return;
	}
	var sku = $("#sku").val();
	if (!sku)
	{
		alert("Please input SKU");
		return;
	}
	$("#subscribeArea .result").empty();
	API.callSubscription(sku, function ()
	{
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function regSubscribe(callback)
{
	if (username != null)
	{
		alert("Please Logout first");
		return;
	}
	var email = $("#email").val();
	if (!email)
	{
		alert("Please input email");
		return;
	}
	var sku = $("#sku").val();
	if (!sku)
	{
		alert("Please input SKU");
		return;
	}
	API.callRegSubscription(email, sku, function ()
	{
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function domainChanged(newDomain)
{
	API.domain = newDomain;
	$.cookie(domainCookieName, API.domain, {expires: 7});
	$("#sslAttempt").attr("href", API.domain);
}
function addCustomDomain(newDomain)
{
	// Validation
	var urlPattern = /(http[s]?:\/\/)?\w+/;
	if (!urlPattern.test(newDomain)) {
		alert("Domain invalid");
		return;
	}
	if (newDomain.indexOf("http") == -1) {
		newDomain = "https://" + newDomain;
	} else {
		newDomain = newDomain.replace("http://", "https://");
	}
	newDomain = newDomain.slice(-1) != "/" ? newDomain + "/" : newDomain;

	if ($("#domain .custom").length > 0) {
		$("#domain .custom").remove();
	}
	$("#domain").prepend("<option value='" + newDomain + "' class='custom'>" + newDomain + "</option>")
			.val(newDomain);
	if ($("#domain").selectmenu("instance")) {
		$("#domain").selectmenu("refresh");
	}
	// FIXME how to fire "change" on selectmenu widget
	domainChanged(newDomain);
}