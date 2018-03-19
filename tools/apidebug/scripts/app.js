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
	addToCache("email", email);
	$("#email").data("ui-autocomplete").option("source", getFromCache("email") || [])
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
	var promoCode = $("#promoCode").val();
	if (promoCode == "")
	{
		promoCode = null;
	}
	$("#subscribeArea .result").empty();
	API.callSubscription(sku, ids, promoCode, function (data)
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
function apiValidate()
{
	var $output = $("#apiValidationArea .result");
	$output.empty();

	$output.text("Checking API Server...");
	$.getJSON(API.domain + "service/config?format=json&callback=?", function (data)
	{
		var apiServer = data.services.api;
		if (apiServer)
		{
			$output.text("Got API Server. Checking token...");
			$.getJSON(API.domain + "secure/accesstoken?format=json&callback=?", function (data)
			{
				var token = data.data.accessToken;
				if (token)
				{
					$output.text("Got token. Validating token...");
					$.getJSON(apiServer + "v1/config?token=" + token + "&callback=?", function (data)
					{
						if (data.services.api == apiServer)
						{
							$output.text("Token validated!");
						}
						else
						{
							$output.text("Token validation failed! API_SECRET_USER not match, please check if APP Server & API Server are using same DB!");
						}
					});
				}
				else
				{
					$output.text("API_SECRET_USER missing!");
				}
			})
		}
		else
		{
			$output.text("No API SERVER configured!");
		}
	});
}

function addToCache(name, value)
{
	if (window.localStorage)
	{
		var values = JSON.parse(window.localStorage.getItem(name));
		if (values == null) values = [];
		values.unshift(value);
		window.localStorage.setItem(name, JSON.stringify(values));
	}
}
function getFromCache(name)
{
	var values = null;
	if (window.localStorage)
	{
		values = JSON.parse(window.localStorage.getItem(name));
		if (values != null && values.length == 0)
		{
			values = null;
		}
	}
	return values;
}
