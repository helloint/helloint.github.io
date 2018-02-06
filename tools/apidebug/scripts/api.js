// APIs
var API = {
	"domain": null,
	"registration": "{domain}secure/register?username={username}&email={email}&password=111111&dobdate=1&dobmonth=1&dobyear=1980&firstname=First&lastname=Last&format=json",
	"login": "{domain}secure/authenticate?username={email}&password=111111&format=json",
	"logout": "{domain}service/logout?format=json",
	"profile": "{domain}account/profile?format=json",
	"subscription": "{domain}secure/register?billing_address1=address1&billing_city=city&billing_country=DZ&billing_zip=1&cardnumber=4111111111111111&cardsc=111&cardholder=First%20Last&cardexpmonth=1&cardexpyear=2020&sku={sku}{ppvId}{promo}&format=json",

	"callRegistration": function (username, email, callback)
	{
		var url = this.registration.replace(/\{domain\}/g, this.domain).replace(/\{username\}/g, username).replace(/\{email\}/g, email);
		$.getJSON(url + "&callback=?", function (data)
		{
			if ($.isFunction(callback))
			{
				callback(data);
			}
		});
	},
	"callLogin": function (email, callback)
	{
		var url = this.login.replace(/\{domain\}/g, this.domain).replace(/\{email\}/g, email);
		$.getJSON(url + "&callback=?", function (data)
		{
			if ($.isFunction(callback))
			{
				callback(data);
			}
		});
	},
	"callLogout": function (callback)
	{
		var url = this.logout.replace(/\{domain\}/g, this.domain);
		$.getJSON(url + "&callback=?", function (data)
		{
			if ($.isFunction(callback))
			{
				callback(data);
			}
		});
	},
	"callSubscription": function (sku, ids, promoCode, callback)
	{
		var url = this.subscription.replace(/\{domain\}/g, this.domain).replace(/\{sku\}/g, sku);
		var ppvId = "";
		if (ids != null)
		{
			if (sku.indexOf("B") == 0)
			{
				ppvId = "&ids=" + ids;
			}
			else
			{
				ppvId = "&id=" + ids;
			}
		}
		url = url.replace(/\{ppvId\}/g, ppvId);
		var promo = "";
		if (promoCode != null)
		{
			promo = "&promo=" + promoCode;
		}
		url = url.replace(/\{promo\}/g, promo);
		$.getJSON(url + "&callback=?", function (data)
		{
			if ($.isFunction(callback))
			{
				callback(data);
			}
		});
	},
	"callProfile": function (callback)
	{
		var url = this.profile.replace(/\{domain\}/g, this.domain);
		$.getJSON(url + "&callback=?", function (data)
		{
			if ($.isFunction(callback))
			{
				callback(data);
			}
		});
	}
};