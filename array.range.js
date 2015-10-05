

// function extract(data, where) {
//     for (var key in data) {
//         where[key] = data[key];
//     }
// }
// log = console.log.bind(console);

function Range(str) {
    var interval = parseRange(str);
    extract(interval, this);
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
Range.prototype.parse = function(str) {
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







Object.defineProperty(Array, "range", {
    enumerable: false,
    configurable: true,
    writeable: true,
    value: Range
});

// log("[-5..5]", Range("[-5..5]"));
// log("[-5.2.5]", Range("[-5.2.5]"));
// log("[-5.-2.5]", Range("[-5.-2.5]"));

// log("[5..-5]", Range("[5..-5]"));
// log("[5.2.-5]", Range("[5.2.-5]"));
// log("[5.-2.-5]", Range("[5.-2.-5]"));





