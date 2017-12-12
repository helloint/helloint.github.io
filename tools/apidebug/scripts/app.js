var username = null;
var domainCookieName = "domain";
var emailCookieName = "email";
var enableUsernameCookieName = "enableUsername";
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
	API.callLogin(email, function (data)
	{
		$("#loginArea .result").text(JSON.stringify(data));
		username = data.data.username;
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
	API.callLogout(function (data)
	{
		$("#loginArea .result").text(JSON.stringify(data));
		username = null;
		if ($.isFunction(callback))
		{
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
	var uname = email;
	var enableUsername = $("#enableUsername").prop("checked");
	if (enableUsername)
	{
		uname = email.substring(0, email.indexOf("@"));
	}
	$("#registerArea .result").empty();
	API.callRegistration(uname, email, function (data)
	{
		$("#registerArea .result").text(JSON.stringify(data));
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function subscribe(callback)
{
	if (username == null)
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
	var ids = $("#ppvId").val();
	if (ids == "")
	{
		ids = null;
	}
	$("#subscribeArea .result").empty();
	API.callSubscription(sku, ids, function (data)
	{
		$("#subscribeArea .result").text(JSON.stringify(data));
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function checkProfile()
{
	if (username == null)
	{
		alert("Please Login first");
		return;
	}
	API.callProfile(function (data)
	{
		$("#profileArea .result").text(JSON.stringify(data));
		if ($.isFunction(callback))
		{
			callback();
		}
	});
}

function domainChanged(newDomain)
{
	if (!sslEnabled())
	{
		newDomain = newDomain.replace("https://", "http://");
	}
	API.domain = newDomain;
	$.cookie(domainCookieName, API.domain, {expires: 7});
	$("#sslAttempt").attr("href", API.domain);
	var id = getIdByDomain(newDomain);
	// only show skus of this domain
	if ($("#skuGroups li.id_" + id).size() > 0)
	{
		$("#skuGroups li").hide();
		$("#skuGroups li.id_" + id).show();
	}
	else
	{
		$("#skuGroups li").show();
	}
	$("#skuGroups").accordion("option", "active", $("#skuGroups li.id_" + id).index());
}

function getIdByDomain(domain)
{
	for (var i = 0; i < projects.length; i++)
	{
		for (var j = 0; j < projects[i].domains.length; j++)
		{
			if (domain == projects[i].domains[j])
			{
				return projects[i].id;
			}
		}
	}
	return null;
}

function addCustomDomain(newDomain)
{
	// Validation
	var urlPattern = /(http[s]?:\/\/)?\w+/;
	if (!urlPattern.test(newDomain))
	{
		alert("Domain invalid");
		return;
	}
	if (newDomain.indexOf("http") == -1)
	{
		if (sslEnabled())
		{
			newDomain = "https://" + newDomain;
		}
		else
		{
			newDomain = "http://" + newDomain;
		}
	}
	else
	{
		if (sslEnabled())
		{
			newDomain = newDomain.replace("http://", "https://");
		}
	}
	newDomain = newDomain.slice(-1) != "/" ? newDomain + "/" : newDomain;

	if ($("#domain .custom").length > 0)
	{
		$("#domain .custom").remove();
	}
	$("#domain").prepend("<option value='" + newDomain + "' class='custom'>" + newDomain + "</option>")
			.val(newDomain);
	$("#domain").selectmenu("refresh");
}
function sslEnabled()
{
	return $("#enableSSL").prop("checked");
}
function isCustomDomain(domain)
{
	for (var i = 0; i < projects.length; i++)
	{
		for (var j = 0; j < projects[i].domains.length; j++)
		{
			if (domain == projects[i].domains[j])
			{
				return false;
			}
		}
	}
	return true;
}