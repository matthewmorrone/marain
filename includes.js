var includes = ["js/jquery.js",
"js/jquery.ui.js",
"js/jquery.ui.multidraggable.js",
"js/lodash.js",
"js/backbone.js",
"js/starch.js",
"js/starch.array.js",
"js/starch.canvas.js",
"js/starch.element.js",
"js/starch.interval.js",
"js/starch.is.js",
"js/starch.number.js",
"js/starch.random.js",
"js/starch.string.js"]

var i = 0, l = includes.length, el, head = document.getElementsByTagName('head')[0]
while(i < l) {
	el = document.createElement("script")
	el.src = includes[i]
	el.type = "text/javascript"
	head.appendChild(el);
	i++
}