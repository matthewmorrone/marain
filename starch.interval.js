// http://en.wikipedia.org/wiki/Interval_(mathematics)#Notations_for_intervals

Object.defineProperty(Array.prototype, "first", {
	enumerable: false,
	configurable: true,
	get: function() {
		return 0;
	}
}); 
Object.defineProperty(Array.prototype, "last", {
	enumerable: false,
	configurable: true,
	get: function() {
		return this.length-1;
	}
});
function extract(data, where) {
    for (var key in data) {
        where[key] = data[key];
    }
}
log = console.log.bind(console);

function parseInterval(str) {
    // var str = ""
    // if (arguments.length === 1) {
    //     str = arguments[0]
    // }
    // if (arguments.length >= 2) {
    //     str = "[" + arguments[0] + "." + (arguments[2] || "") + "." + arguments[1] + "]"
    // }
    var interval = str.match(/([\[\]\(])(\-?\d+)([\.,])(\-?\d+)?([\.,])?(\-?\d+)([\[\]\)])/).slice(1);

    var result = {};
	result.leftEncl = interval[interval.first];
	result.riteEncl = interval[interval.last];

	result.left = parseInt(interval[interval.first+1], 10);
	result.rite = parseInt(interval[interval.last-1], 10);

	result.step = parseInt(interval[3], 10) || 1;
	if (result.step === 0) {
		result.step = 1;
	}
	return result;
}

function interval(str) {
    var interval = parseInterval(str);
    // var interval = parseInterval(arguments[0], arguments[1], arguments[2]);
    // extract(interval, this);

    var leftEncl = interval.leftEncl;
    var riteEncl = interval.riteEncl;
    var left = parseInt(interval.left, 10);
    var rite = parseInt(interval.rite, 10);
    var step = parseInt(interval[3], 10) || 1;    
    log(leftEncl, riteEncl, left, rite, step)

	step = Math.abs(step);

	if (left === rite) {
		if (leftEncl === "[" && riteEncl === "]") {
			return [left];
		}
		else {
			return [];
		}
	}
    var result = [];
    var revFlag = false;

    if (interval.step < 0) {
        revFlag = true;
    }
    if (left > rite) {
        var swap = left;
        left = rite;
        rite = swap;         
    }

    if (leftEncl === "[" && leftEncl !== "]" && (left+1-step) === left) {
        result.push(left);
    }
    for(var i = left+1; i < rite; i+=step) {
        result.push(i);
    }
    if (riteEncl === "]" && riteEncl !== "[" && (result[result.length-1]+step) === rite) {
        result.push(rite);
    } 
	return revFlag ? result.reverse(): result;
}


Object.defineProperty(Array, "interval", {
    enumerable: false, 
    configurable: true, 
    writeable: true, 
    value: interval
});

// log("[-5..5]", interval("[-5..5]"));
// log("[-5.2.5]", interval("[-5.2.5]"));
// log("[-5.-2.5]", interval("[-5.-2.5]"));

// log("[5..-5]", interval("[5..-5]"));
// log("[5.2.-5]", interval("[5.2.-5]"));
// log("[5.-2.-5]", interval("[5.-2.-5]"));