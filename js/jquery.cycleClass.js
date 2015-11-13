
/*

$.fn.cycleClasses = function(){
	if(!$(this).data("aClasses")){
		var classes = $(this).attr("data-classes").split(",");
		$(this).data("aClasses", classes);
		$(this).data("classes", classes.join(" "));
		$(this).data("class", classes.length);
	}
	$(this).data("class", ($(this).data("class")+1) % $(this).data("aClasses").length);
	$(this).removeClass($(this).data("classes")).addClass($(this).data("aClasses")[$(this).data("class")]);
	return $(this);
}
// $('.someElement').cycleClasses('a', 'b', 'c')
*/


/*
Example: $("#linky").cycleClass(["foo","bar","jonez"]);

Scenarios:
if "foo" found, replace with "bar"
if "jonez" found, replace with "foo"
if "bar" and "jonez" found, replace both with "foo"
if none found, "foo" (first element) added

*/

	$("img").cycleClass(["inverted", "grayscale", "sepia", "saturated", "hue-rotate", "opaque", "brighten", "contrasted", "blurred", "shadowed"])


(function($){


	$.fn.cycleClass = function(args) {
		if($.fn.cycleClass.arguments.length === 0) {return this;}
		return this.each(function() {
			var currentObject = $(this);
			var farthestClass = -1;
			var classList = currentObject.attr('class').split(/\s+/);
			$.each(classList, function(index, item){
				var position = $.inArray(item, args);
				if(position > farthestClass){farthestClass = position;}
			});
			if(farthestClass > -1){
				$.each(args,function(index, item) {
					currentObject.removeClass(item)
				});
				nextClass = (farthestClass + 1) % args.length;
				currentObject.addClass(args[nextClass]);
			} else {
				currentObject.addClass(args[0]);
			}
		});
	};
})(jQuery);
/*

$.fn.cycleClass = function(classes) {
	$(this).each(function() {
		this.className = classes[($.inArray(this.className, classes)+1) % classes.length]
	})
}

$.fn.cycleClass = function() {
	var classes, currentClass, nextClass, _this = this;
	classes = Array.prototype.slice.call(arguments);

	currentClass = $.grep(classes, function(klass) {
		_this.hasClass(klass);
	}).pop();

	nextClass = classes[classes.indexOf(currentClass) + 1] || classes[0];

	this.removeClass(currentClass);
	return this.addClass(nextClass);
};

*/