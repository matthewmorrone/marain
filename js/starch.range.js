

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








var Range = function Range(min, max, step) {
  var that = this
    , sequence = 'abcdefghijklmnopqrstuvwxyz'
    , sequenceUpper = sequence.toUpperCase()
    , sequence = sequence.split('')
    , sequenceUpper = sequenceUpper.split('')
    , scope = null
    , re = /^([A-Za-z]|\d+)\.{2}([A-Za-z]|\d+)$/
  var str = ""
  if (arguments.length === 1) {
    str = arguments[0]
  }
  if (arguments.length === 2) {
    str = "[" + arguments[0] + "." + (arguments[2] || "") + "." + arguments[1] + "]"
  }
  var result = str.match(/([\[\]\(])(\-?\d+)([\.,])(\-?\d+)?([\.,])?(\-?\d+)([\[\]\)])/).slice(1)
  that.leftEncl = result.first()
  that.riteEncl = result.last()
  that.min = parseInt(result[result.start() + 1], 10)
  that.max = parseInt(result[result.end() - 1], 10)
  that.step = parseInt(result[3], 10) || 1
  if (step === 0) {
    that.step = 1
  }
  that.step = Math.abs(step)


  return function() {
    if (that.min === that.rite) {
      if (that.leftEncl === "[" && that.riteEncl === "]") {
        return [that.left]
      } else {
        return []
      }
    }
    var result = []
    var revFlag = false
    if (that.step < 0) {
      revFlag = true
    }
    if (that.min > that.rite) {
      var swap = that.left
      that.min = that.rite
      that.max = swap
    }
    if (that.leftEncl === "[" && that.leftEncl !== "]") { // && (left + 1 - step) === left) {
      result.push(that.left)
    }
    for (var i = that.min + 1; i < that.rite; i += that.step) {
      result.push(i)
    }
    if (that.riteEncl === "]" && that.riteEncl !== "[") { // && (result[result.length - 1] + step) === rite) {
      result.push(that.rite)
    }
    return revFlag ? result.reverse() : result
  }

}






Range.prototype.min = function(min) {
  if (arguments.length === 0) {
    return this._min
  }
  this._min = min
  return this
}

Range.prototype.max = function(max) {
  if (arguments.length === 0) {
    return this._max
  }
  this._max = max
  return this
}

Range.prototype.step = function(step) {
  if (arguments.length === 0) {
    return this._step
  }
  this._step = step === void 0 ? 1 : step
  return this
}

Range.prototype.toArray = function() {
  return typeof this.min() === 'number'
    ? this.numericArray()
    : this.alphaArray()
}

Range.prototype.numericArray = function() {
  var step = this.step()
    , min = this.min()
    , max = this.max()
    , isFloat = typeof min === 'float'
    , array = []
  while (min <= max) {
    array[array.length] = min
    min += step
  }
  return array
}

Range.prototype.alphaArray = function() {
  var step = this.step()
    , first = this.min()
    , min = null
    , max = null
    , base = null
    , array = []
  base = first === first.toUpperCase() ? sequenceUpper : sequence
  min = base.indexOf(first) - step
  max = base.indexOf(this.max())
  while ((min += step) <= max) {
    array[array.length] = base[min]
  }
  return array
}

Range.prototype.includes = function(value) {
  return !!~this.toArray().indexOf(value)
}

Range.prototype.each = function(fn) {
  this.toArray().forEach(fn)
}

Range.prototype.map = function(fn) {
  return this.toArray().map(fn)
}

Range.prototype.join = function(sep) {
  sep = sep === void 0 ? ',' : sep
  return this.toArray().join(sep)
}

Range.prototype.equal = function(range) {
  return this.min()  === range.min()
      && this.max()  === range.max()
      && this.step() === range.step()
}

Range.prototype.sum = function() {
  var total = 0
  this.each(function(n) {
    total += n
  })
  return total
}

Array.define("range", Range)
