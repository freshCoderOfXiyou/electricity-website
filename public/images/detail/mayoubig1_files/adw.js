(function() {
	var account,CDomain,uid,sid,wa = "_adwq",
		l = "length",
		w = window,
		na = navigator,
		ud = undefined,
		ln = "location",
		d = document,
		ec = encodeURIComponent,
		dc = decodeURIComponent,
		e = false,
		ncu = '99999999999999999999',
		date = new Date();
		
        ef = new Array(new Array("etc_n", "adw_channel"),
                       new Array("etc_s", "adw_source"),
                       new Array("etc_g", "adw_group"),
                       new Array("etc_k", "adw_keyword", "adw_term"),
                       new Array("etc_t", "adw_creative", "adw_content"),
                       new Array("etc_c", "adw_campaign"),
                       new Array("etc_m", "adw_media", "adw_medium"),
                       new Array("etc_x", "adw_attr"),
                       new Array("etc_p"));

	function getEMDomain() {
		return ('https:' == location['protocol'] ? 'https:' : 'http:') + '//et.emarbox.com';
	}
	
	function hash(d) {
		var a = 1, c = 0, h, o;
		if (d) {
			a = 0;
			for (h = d[l] - 1; h >= 0; h--) {
				o = d.charCodeAt(h);
				a = (a << 6 & 268435455) + o + (o << 14);
				c = a & 266338304;
				a = c != 0 ? a ^ c >> 21 : a;
			};
		}
		return a;
	}
	
	function lensplit(s, n) {
		var l = 0;
		var es = "";
		var a = s.split("");
		for ( var i = 0; i < a.length; i++) {
			if (a[i].charCodeAt(0) < 299) {
				l++;
			} else {
				l += 2;
			}
			es += a[i];
			if (l >= n) {
				break;
			}
		}
		return es;
	};

	function jugetime() {
		if (date.getHours() == 1 && date.getMinutes() >= 30) {
			return true;
		} else {
			return false;
		}
	};

	function mc() {
		var rnd = "";
		for (var i = 0; i < 10; i++) {
			rnd += Math.floor(Math.random() * 10);
		}
		return rnd;
	};
	
	var CookiesUtil = function(){
		var i = this;
		i.set = function(name, value, expires, path, domain) {
			if (typeof expires == "undefined") {
				expires = "";
			}
			d.cookie = name + "=" + escape(value)
					+ ((expires) ? "; expires=" + expires.toGMTString() : "")
					+ "; path = /"
					+ ((CDomain) ? ";domain=" + CDomain : "");
		};
		i.get = function(name) {
			var arr = d.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (arr != null) {
				return unescape(arr[2]);
			}
			return null;
		};
		i.clear = function(name, path, domain) {
			if (this.get(name)) {
				d.cookie = name + "="
						+ ";path=/"
						+ ";domain=" +CDomain
						+ ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}
		};
	};
	
	var c = new CookiesUtil;
	
	var cp = function() {
		var i = this;
		var ts = (Date.parse(date)) / 1000;
		var _hash = hash(d.domain);
		
		i.dt = function(days, hours){
			return new Date(date.getTime() + days * hours * 3600 * 1000);
		};
		
		i.ca = function() {
			if (c.get("_adwp") == null) {
				var ca_adwp = new Array(_hash, mc(), ts, ts, ts, 1);
				c.set("_adwp", ca_adwp.join("."), this.dt(712, 24));
				e = true;
				return true;
			}
		};
		
		i.ua = function() {
			if (c.get("_adwp") != null) {
				var aq = c.get("_adwp").split("."); c.clear("_adwp");
				var ua_adwp = new Array(aq[0], aq[1], aq[2], aq[4], ts, (parseInt(aq[5]) + parseInt(1)));
				c.set("_adwp", ua_adwp.join("."), this.dt(712, 24));
				e = true;
				this.bs();this.cs();
				if (!isContainAdw(d.location.href) && decodea(account)==277) {
					c.clear("_adwe");
				}
			} else {
				this.ca();
			}
		};
		
		i.bs = function() {
			c.set("_adwb", _hash, this.dt(1, 0.5));
		};
		
		i.b = function() {
			if (c.get("_adwb") == null) {
				this.bs();return false;
			} else {
				this.bs();return true;
			}
		};
		
		i.cs = function() {
			c.set("_adwc", _hash, false);
		};
		
		i.c = function() {
			if (c.get("_adwc") == null) {
				this.cs(); return false;
			} else {
				return true;
			}
		};
		
		i.o = function(on) {
			if (c.get('_adwo') == null) {
				c.set('_adwo', _hash + "."  + '1' + '.'+ on, this.dt(30, 24));
			}else {
				c.set('_adwo', _hash + "." + (parseInt((c.get('_adwo').split('.'))[1]) + parseInt(1)) + '.'+ on, this.dt(30, 24));
			}
		};
		
		i.ef = function(days) {
			var time = days == 0 ? false : this.dt(days, 24);
			c.set("_adwe", _hash + '#' + ec(d.location.href), time);
		};
		
		i.rf = function(referer) {
			c.set("_adwr", _hash + '#' + ec(referer), this.dt(180, 24));
		};
	};
	
	var cp = new cp();
	
	var browser = function() {
		var i = this;
		i.w = function() {
			return w.screen.width;
		};
		
		i.h = function() {
			return w.screen.height;
		};
		
		i.c = function() {
			return w.screen.colorDepth + "-bit";
		};
		
		i.l = function() {
			var lang = na.language;
			return lang ? lang : na.browserLanguage;
		};
		
		i.j = function() {
			return na.javaEnabled() ? 1 : 0;
		};
		
		i.p = function() {
			return d.location.protocol;
		};
		
		i.t = function() {
			return lensplit(d.title,200);
		};
		
		i.lh = function() {
			return this.su(d.location.href);
		};
		
		i.re = function() {
			return d.referrer;
		};
		
		i.kd = function(element){
			var doc = d;
			var keyword = '';
			if (!doc) {
				return "";
			}
			var head = doc.head ? doc.head : doc.getElementsByTagName("head").length > 0 ? doc.getElementsByTagName("head")[0] : null;
			if (head == null) {
				return keyword;
			}
			var n = head.firstChild;
			while (n && n != 'undefined') {
				var name = n.nodeName;
				if (name && name.toLowerCase() == 'meta' && (n.httpEquiv && n.httpEquiv.toLowerCase() == element || n.name&& n.name.toLowerCase() == element)) {
					if (n.content && n.content != 'undefined') {
						keyword = keyword + n.content;
					}
				}
				n = n.nextSibling;
			}
			return keyword;
		};
		
		i.kwd = function(){
			return this.kd("keywords");
		};
		i.dst = function(){
			return this.kd("description");
		};
		i.su = function (dlh){
			try {
				dlh = dc(dlh);
			} catch (e) {
			}
			var uri = dlh.substring(0, dlh.indexOf("?"));
			if (uri != "") {
				var url = dlh.substring(dlh.indexOf("?") + 1, dlh.length);
				try {
					uri = dc(uri);
				} catch (e) {
				}
				var parmeter = url.split("&");
				var urlc = "";
				for (var i = 0; i < parmeter[l]; i++) {
					var p = parmeter[i].split("=");
					if (p[l] == 1) {
						p = parmeter[i];
						urlc = urlc + p + "&";
						continue;
					}
					if (p == "") {
						urlc = urlc + "" + "&";
					} else {
						try{
							val = dc(p[1]);
						}catch(e1){
							val = p[1];
						}
						var pp = p[0] + "=" + val;
						urlc = urlc + pp + "&";
					}
				}
				return uri + "?" + urlc.substring(0,urlc[l]-1);
			} else {
				return dc(dlh);
			}
		};
		i.charset = function() {
			return d.characterSet ? d.characterSet : d.charset; 
		};
		i.acceptCookie = function() {
			return '0';
		};
		i.fh = function(){
			return "0";
		};
	};
	
	var b = new browser;
	
	function getERUrl(cname){
		var cc = c.get(cname);
		var epurl = "";
		if (cc != null) {
			epurl = cc.substring(cc.indexOf("#") + 1, cc[l]);
		}
		return dc(epurl);
	}
	
    function referer() {
        var ref = '';
        var lh = b.lh();
        var refer = b.re();
        refer = refer == '' ? "0" : refer;
        if (!isNotSelfDomain()) {
            if (isContainAdw(lh)) {
                if (!(getERUrl("_adwr") == lh)) {
                    cp.rf(lh);
                    ref = lh;
                }
            } else {
                if (!(getERUrl("_adwr") == refer)) {
                    if (!(refer == "0")) {
                        cp.rf(refer);
                        ref = refer;
                    } else if (e) {
                        cp.rf(refer);
                        ref = refer;
                    }
                }
            }
        }
        return ec(ref);
    }
	
    function decodea(decodenum){
        var base_num = 10000;
        return Math.floor(parseInt(decodenum, 36)/base_num);
    };
    
	function isContainAdw(lh){
		var juge_contain = false;
		Outer: 
		for ( var i = 0; i < ef.length; i++) {
			var ele = ef[i];
			if (typeof (ele) == 'object') {
				for ( var j = 0; j < ele.length; j++) {
					if (lh.indexOf(ele[j]) > 0) {
						juge_contain = true;
						break Outer;
					};
				};
			} else if (typeof (ele) == "string") {
				if (lh.indexOf(ef[i]) > 0) {
					juge_contain = true;
					break Outer;
				};
			};
		};
		return juge_contain;
	};
	
	function isNotSelfDomain(){
		var _domain = d.domain;
		var _refer = b.re();
		if (w.location.port != "") {
			_domain = _domain + ":" + w.location.port;
		}
		var _referdomain = _refer == "" ? "" : _refer.split('/')[2];
		return _domain == _referdomain;
	};
	
	function effect(days) {
		var lh = b.lh();
		var epu = getERUrl("_adwe");
        try{
                epu = dc(epu);
        }catch(ex){
        }
		if (isContainAdw(lh)) {
			if (!isNotSelfDomain()) {
				for ( var i = 0; i < ef.length; i++) {
					var ele = ef[i];
					if (typeof (ele) == 'object') {
						var etlist = new Array();
						var lhlist = new Array();
						for ( var j = 0; j < ele.length; j++) {
							re = new RegExp("^http(?:s)?://.+(?:[?#&]" + ele[j] + "=([^&]+)).*$");
							var lr = lh.match(re);
							var er = epu.match(re);
							var erv = (er == null ? "" : er[1]);
							var lrv = (lr == null ? "" : lr[1]);
							if (erv != "") {
								etlist.push(erv);
							}
							if (lrv != "") {
								lhlist.push(lrv);
							}
						}
						
						if (lhlist.length > 0) {
							if (etlist.length == 0 || (etlist[0] != lhlist[0])) {
								cp.ef(days);
								return true;
							}
						}
					} else if (typeof (ele) == "string") {
						re = new RegExp("^http(?:s)?://.+(?:[?#&]" + ele + "=([^&]+)).*$");
						var lr = lh.match(re);
						var er = epu.match(re);
						if ((lr == null ? "" : lr[1]) != (er == null ? "" : er[1])) {
							cp.ef(days);
							return true;
						}
					}
				}
				return false;
			}
		} else if (decodea(account) == 277 && e==true) {
			c.clear("_adwe");
			return true;
		}
	};
	
	var createImg = function(url) {
		var img = new Image(1, 1);
		img.onload = function() {
			img.onload = null;
		};
		img.src = url;
	};
    
    var createIframe = function(url) {
		var ac = d.createElement("iframe");
		ac.style.width = "1px";
		ac.style.border = 0;
		ac.style.position = "absolute";
		ac.style.left = "-100px";
		ac.style.top = "-100px";
		ac.style.height = "1px";
		ac.src = url;
		ac.id = "emar_box_pv";
		if (d.body) {
			d.body.insertBefore(ac, null);
		} else {
			d.onreadystatechange = function() {
				if (d.readyState == 'complete') {
					d.body.insertBefore(ac, null);
				}
			};
		}
	};
    
    var effectRD = 30;
    var _setEffectRD = function(days) {
    	if(!isNaN(days)){
    		effectRD = days;
    	}
    };
    
	var ourl = "", aurl = "", curl = "";
	
    var _setAction = function(actID, attr) {
		attr = !attr ? "" : lensplit(attr,150);
		var _suid = _getAdwp();
		aurl = getEMDomain(account) + '/_adwa2.gif' + '?adwu=' + _suid[1] + '&adws=' + _suid[0] + '&adwactid=' + actID 
			   + '&attr=' + ec(attr) + '&adweu=' + ec(b.su(dc(_getEurl()))) + '&adwmc=' + mc()  + '&adwa=' + account 
			   + '&encoding=' + b.charset() +  '&adwlh=' + ec(b.lh());
		new createImg(aurl);
	};

	var gon;
	var _dataType = 'order', _customer = '', _rid = '', _page_groups_id = '', _page_url = '';
	var _setOrder = function(on, op, attr) {
		gon = on;
		attr = !attr ? "" : lensplit(attr,150);
		ourl = '&on=' + ec(on) + '&op=' + op + '&attr=' + ec(attr);
	};

	var items = new Array();
	
	var _setItem = function(pn, pna, pp, ta, ct, ctn, opp, mi, st, purl, pet, brid, brna) {
		items.push([pn, pna, pp, ta, ct, ctn, opp, mi, st, purl, pet, brid, brna]); 
	};
	
	var _setDataType = function(dataType) {
		_dataType = dataType;
	};

	var _setCustomer = function(customer){
		_customer = customer;	
	};
	
	var _setRuleid = function(rid) {
		_rid = rid;
	};

	var _setPageGroup = function(pg) {
		_page_groups_id = _page_groups_id + pg + ",";
	};
	var _setPageUrl = function(pu) {
		_page_url = pu;
		_trackPageview();
	};
	
	var sendmode = "iframe";
	var _setSendMode = function(mode) {
		sendmode = mode;
	}

	function _getAdwp() {
		var ac = c.get("_adwp");
		if (ac != null) {
			var acq = ac.split(".");
			uid = acq[2] + acq[1];
			sid = uid + acq[5];
			return new Array(sid, uid, acq[2], acq[3], acq[5]);
		} else {
			return new Array((Date.parse(date)) / 1000 + mc(), ncu, "", "", "");
		}
	}
	
	function _getEurl(){
		var cc = c.get("_adwe");
		return cc == null ? "" : cc.substring(cc.indexOf("#") + 1, cc[l]);
	}

	var _trackTrans = function() {
		var i = this;
		i.emsub = function(subobj) {
			return subobj.substring(0, subobj[l] - 1);
		};
		var pn='',pna='',pp='',ta='',ct='',ctn='';
		for (var j =0; j < items[l]; j++) {
			pn += items[j][0]; pn += '|';
			pna += items[j][1]; pna += '|';
			pp += items[j][2]; pp += '|';
			ta += items[j][3]; ta += '|';
			ct += items[j][4]; ct += '|';
			ctn += items[j][5]; ctn += '|';
		}
		ourl += '&pn='+ec(emsub(pn))+'&pp='+ec(emsub(pp))+'&ta='+ec(emsub(ta))+'&ct='+ec(emsub(ct))+'&ctn='+ec(emsub(ctn)) + '&adwa=' + account + '&encoding=' + b.charset() + '&datatype=' + _dataType + '&customer=' + _customer;

		if ("view" == _dataType) {
			old_price = items[0][6];
			old_price = old_price == ud ? "" : old_price;
			
			material = items[0][7];
			material = material == ud ? "" : material;
			
			pstatus = items[0][8];
			pstatus = pstatus == ud ? "" : pstatus;
			
			purl = items[0][9];
			purl = purl == ud ? "" : purl;
			
			pet = items[0][10];
			pet = pet == ud ? "" : pet;
			
			brid = items[0][11];
			brid = brid == ud ? "" : brid;
			
			brna = items[0][12];
			brna = brna == ud ? "" : brna;

			ourl += '&old_price=' + old_price + '&material=' + ec(material)
					+ '&pstatus=' + pstatus + '&purl=' + ec(purl)
					+ '&pendtime=' + pet + '&brid=' + brid + '&brna=' + ec(brna);
		}
		
		var _suid = _getAdwp();
		ourl = getEMDomain(account) + '/_adwo2.gif' + '?adwu=' + _suid[1] + '&adws=' + _suid[0] + '&adweu=' + ec(b.su(dc(_getEurl()))) + ourl + '&mc=' + mc();
		pnau = '&pna='+ec(emsub(pna));
		
        if (na.userAgent.indexOf("MSIE") > 0) {
            if ((ourl + pnau).length < 2000) {
                ourl = ourl + pnau;
            }else{
                ourl = ourl + "&pna=";
            }
        } else {
            if ((ourl + pnau).length < 6000) {
                ourl = ourl + pnau;
            }else{
                ourl = ourl + "&pna=";
            }
        }

        var oc = c.get('_adwo');
		if(gon != ud && gon != ''){
			if(oc != null) {
				if((oc.split('.')[2]) === gon)
				return;
			}
			cp.o(gon);
		}
		new createImg(ourl);
		ourl = '';
		gon = "";
		items = new Array();
	};
	
	var Log = function() {
		var i = this;
		var url = ""; 
		i.checksession = function() {
			var ac = c.get("_adwp");
			if (ac != null && jugetime()) {
				var acq = ac.split(".");
				var cc = new Date();
				var o = new Date(acq[4] * 1000);
				if(!(o.getDate() == cc.getDate())){
					cp.ua();
				}
			}
		};
		
		i.acquireCookie = function() {
			this.checksession();
			var _cadwp = _getAdwp();
			url = '?adwu=' + _cadwp[1] + '&adws=' + _cadwp[0] + '&adwft=' + _cadwp[2] + '&adwpt=' + _cadwp[3] + '&adwv=' + _cadwp[4] + '&adweu=' + ec(b.su(dc(_getEurl())));
		};
		
		i.acquireBrowser = function() {
			__pageurl = _page_url == "" ? ec(b.lh()) : ec(_page_url);
			url += '&adwsw=' + b.w() + '&adwsh=' + b.h() + '&adwmc=' + mc() + '&adwlh=' + __pageurl + '&adwr=' + ec(b.re())
					+ '&adwsc=' + b.c() + '&adwl=' + b.l() + '&adwj=' + b.j() + '&adwp=' + ec(b.p())
					+ '&adwfv=' + b.fh() + '&adwac=' + b.acceptCookie() + '&adwa=' + account + '&adwe=' + e + '&adwcr=' + referer()
					+ '&encoding=' + b.charset() + '&drid=' + _rid  + '&pgi=' + _page_groups_id.substring(0, _page_groups_id.length-1);
			e = false;
		};
		
        i.sendlog = function() {
			this.acquireCookie();
			this.acquireBrowser();
			kdurl = '&adwt=' + b.t() + '&kwd=' + b.kwd() + '&dst=' + b.dst();
			if (na.userAgent.indexOf("MSIE") > 0) {
				for ( var i = 0; i < kdurl.length; i++) {
					if (url.length < 2000) {
						if(kdurl.charAt(i)=="&" || kdurl.charAt(i) == "="){
							url = url + kdurl.charAt(i);
							continue;
						}
						url = url + ec(kdurl.charAt(i));
					} else {
						break;
					}
				}
			}else{
				for ( var i = 0; i < kdurl.length; i++) {
					if (url.length < 6000) {
						if(kdurl.charAt(i)=="&" || kdurl.charAt(i) == "="){
							url = url + kdurl.charAt(i);
							continue;
						}
						url = url + ec(kdurl.charAt(i));
					} else {
						break;
					}
				}
 			}
			url = getEMDomain(account)+ '/_adw.gif' + url;

			if (sendmode == "iframe") {
				url += "&ver=1.1";
				new createIframe(url);
			} else if (sendmode == "img") {
				new createImg(url);
			} else {
				new createImg(url);
			}
		};
	};
	
	var tracker = function(){
		var i = this;
		i._initData = function(){
			var _eflag = effect(decodea(account) == 277 ? 1 : effectRD);
			var _iab = cp.b(); 
			var _iac = cp.c();
			if(!cp.ca()) {
				if(!_iab || !_iac){
					cp.ua();
				} else {
					cp.ca();
					if(_eflag){
						cp.ua();
					}
				};
			};
			var L = new Log;
			L.sendlog(); 
		};
	};
	
	var _setDomainName = function(Domain) {
		CDomain = Domain;
		if (decodea(account) == 5096) {
			CDomain = document.location.host;
		}
	};
	
	var a = new tracker;
	var _setAccount = function(a) {
		account = a;
		var f = arguments;
	};
	
	var _trackPageview = function() {
		var t = new tracker;
		if (!CDomain) {
			CDomain = document.location.host;
		};
		t._initData();
	};
	
	var Fa = function() {
		var i = this;
		i.push = function() {
			var args = arguments, m = 0;
			for ( var j = 0; j < args[l]; j++) {
				try {
					if (typeof args[j] === "function")
						args[j]();
					else {
						var o = args[j][0];
						eval(o).apply(w,args[j].slice(1));
					}
				} catch (d) {
			        var errDomain = ('https:' == location['protocol'] ? 'https:':'http:') + '//err.emarbox.com';
					new createImg(errDomain + "/_adwerr.gif?adwa=" + account + "&url=" + ec(b.lh()) + "&referer=" + ec(b.re()));
				}
			}
			return m;
		};
	};
	
	var adwq = w[wa];
	if(adwq == ud){
		window._adwq = new Array();
		adwq = w[wa];
	};
	var Ea = new Fa;
	if (adwq && typeof adwq.push == "function") {
		if (adwq.constructor === Array) {
			w[wa] = Ea;
			for ( var j = 0; j < adwq[l]; ++j) {
				Ea.push(adwq[j]); 
			}
		}
	}
})();;