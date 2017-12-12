// APIs
var API = {
	"domain": null,
	"registration": "{domain}secure/chargeregister?username={email}&password=111111&firstname=a&lastname=a&locale=en_US&dobyear=1995&dobmonth=1&dobdate=2",
	"login": "{domain}secure/login?username={email}&password=111111",
	"logout": "{domain}servlets/logout",
	"subscription": "{domain}secure/chargeregister?productid={sku}&billing_address1=address1&billing_address2=address2&billing_city=city&billing_country=DZ&billing_state&billing_zip=1&cardexpmonth=7&cardexpyear=2020&cardholder=a%20a&cardnumber=4111111111111111&phone=44-12345678",
	"regSubscription": "{domain}secure/chargeregister?productid={sku}&username={email}&password=111111&firstname=a&lastname=a&locale=en_US&dobyear=1995&dobmonth=1&dobdate=2&billing_address1=address1&billing_address2=address2&billing_city=city&billing_country=DZ&billing_state&billing_zip=1&cardexpmonth=7&cardexpyear=2020&cardholder=a%20a&cardnumber=4111111111111111&phone=44-12345678",
	"ppv": "{domain}secure/order?programid={programId}&address1=1&address2=1&cardexpmonth=4&cardexpyear=2019&cardholder=a%20a&cardnumber=4111111111111111&city=1&country=AZ&paytype=cc&pt=game&zip=1",
	"redeem": "{domain}secure/order?pt=game&notPPV=true&programid=3889",
	"callRegistration": function (email, callback) {
		var url = this.registration.replace(/\{domain\}/g, this.domain).replace(/\{email\}/g, email);
		$("#result").attr("src", url);
		if ($.isFunction(callback)) {
			callback();
		}
	},
	"callLogin": function (email, callback) {
		var url = this.login.replace(/\{domain\}/g, this.domain).replace(/\{email\}/g, email);
		$("#result").attr("src", url);
		if ($.isFunction(callback)) {
			callback();
		}
	},
	"callLogout": function (callback) {
		var url = this.logout.replace(/\{domain\}/g, this.domain);
		$("#result").attr("src", url);
		if ($.isFunction(callback)) {
			callback();
		}
	},
	"callSubscription": function (sku, callback) {
		var url = this.subscription.replace(/\{domain\}/g, this.domain).replace(/\{sku\}/g, sku);
		$("#result").attr("src", url);
		if ($.isFunction(callback)) {
			callback();
		}
	},
	"callRegSubscription": function (email, sku, callback) {
		var url = this.regSubscription.replace(/\{domain\}/g, this.domain)
				.replace(/\{email\}/g, email)
				.replace(/\{sku\}/g, sku);
		$("#result").attr("src", url);
		if ($.isFunction(callback)) {
			callback();
		}
	}
};