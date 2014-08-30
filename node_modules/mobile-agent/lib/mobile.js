module.exports = function(ua) {
	var useragent = require('useragent');
	var agent = useragent.is(ua);

	$ = {
		Mobile: false,
		iOS: false,
		iPhone: false,
		iPad: false,
		Android: false,
		webOS: false,
		Mac: false,
		Windows: false,
		Other: true,

		Browser: {
			name: null,
			version: 0
		}
	};

	function ver(re, index, replaceA, replaceB) {
		var v = re.exec(ua);
		if(v === null || typeof v !== 'object' || typeof v.length !== 'number') {
			return true; 
		} else if(typeof v.length === 'number' && v.length >= (index + 1)) {
			if(replaceA && replaceB) return v[index].replace(replaceA, replaceB);
			else return v[index];
		} else {
			return true;
		}
	}

	if (/mobile/i.test(ua)) {
		$.Mobile = true;
	}

	if (/like Mac OS X/.test(ua)) {
		$.iOS 		= ver(/CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/, 2, /_/g, '.');
		$.iPhone 	= /iPhone/.test(ua);
		$.iPad 		= /iPad/.test(ua);
	}

	if (/Android/.test(ua)) {
		$.Android = ver(/Android ([0-9\.]+)[\);]/, 1);
	}

	if (/webOS\//.test(ua)) {
		$.webOS = ver(/webOS\/([0-9\.]+)[\);]/, 1);
	}

	if (/(Intel|PPC) Mac OS X/.test(ua)) {
		$.Mac = ver(/(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/, 2, /_/g, '.');
	}

	if (/Windows NT/.test(ua)) {
		$.Windows = ver(/Windows NT ([0-9\._]+)[\);]/, 1);
	}

	for(var key in $) {
		if(key !== 'Other' && key !== 'Mobile' && $[key] !== false) {
			$.Other = false;
		}
	}

	for(var browser in agent) {
		if(browser !== 'version' && agent[browser] === true) $.Browser.name = browser;
		if(browser === 'version') $.Browser.version = agent[browser];
	}

	return $;
}