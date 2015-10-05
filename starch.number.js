Number.prototype.define("base", function(b, c) {
  var s = "", n = this
  if (b > (c = (c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split("")).length || b < 2) {
    return ""
  }
  while (n) {
    s = c[n % b] + s, n = Math.floor(n / b)
  }
  return s
})
Number.prototype.define("abs", function() {
  return Math.abs(this)
})
Number.prototype.base26 = (function () {
	return function base26() {
		n = this
		ret = "";
		while(parseInt(n)>0){
			--n;
			ret += String.fromCharCode("A".charCodeAt(0)+(n%26));
			n/=26;
		}
		return ret.split("").reverse().join("");
	};
}());

