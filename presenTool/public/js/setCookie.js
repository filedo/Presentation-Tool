function setCookie(name, value, expire, path){
	var cookie = name + '=' + escape(value);
	if(expire){
		cookie += '; expires=' + expire.toGMTString();
	}
	if(path){
		cookie += '; path=' + path;
	}
	document.cookie = cookie;
}