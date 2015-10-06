
var log = console.log.bind(console)
var j = document.querySelectorAll;

function iter() {
    var internal = 0;
    return function() {
        internal++;
        return internal.base26();
    };
}

var uniq = iter();
function Vertex(id) {
  this.id = id;
  return this;
}
function Edge(v1, v2) {
  this.v1 = v1;
  this.v2 = v2;
  return this;
}
var edges = [
  ["a", "b"],
  ["b", "c"],
  ["a", "d"],
  ["b", "e"],
  ["c", "f"],
  ["d", "e"],
  ["e", "f"],
  ["d", "g"],
  ["e", "h"],
  ["f", "i"],
  ["g", "h"],
  ["h", "i"]
];
var colors = [
  "aqua",
  // "black",
  "blue",
  "fuschia",
  "gray",
  "green",
  "grey",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "red",
  "silver",
  "teal",
  "white",
  "yellow"
  ];


var coords = [
[  0.0,    2.5,   52.5,    2.5],//, "red"],
[ 47.5,    2.5,  100.0,    2.5],//, "orange"],
[  2.5,    0.0,    2.5,   52.5],//, "yellow"],
[ 50.0,    0.0,   50.0,   50.0],//, "green"],
[ 97.5,   52.5,   97.5,    0.0],//, "blue"],
[  0.0,   50.0,   52.5,   50.0],//, "purple"],
[ 47.5,   50.0,  100.0,   50.0],//, "black"],
[  2.5,   47.5,    2.5,  100.0],//, "lightgreen"],
[ 50.0,   47.5,   50.0,  100.0],//, "fuschia"],
[ 97.5,  100.0,   97.5,   47.5],//, "magenta"],
[  0.0,   97.5,   52.5,   97.5],//, "lavender"],
[ 47.5,   97.5,  100.0,   97.5],//, "brown"]
];

function Glyph(hash) {
  var that = this;
  that.v = new Set();
  that.e = new Nihil();
  edges.each(function(edge, i) {
    that.v.add(edge[0]);
    that.v.add(edge[1]);
    that.e[edge+""] = hash ? hash[i].toInt() : 0;
  });
  that.c = new Canvas();
  that.h = hash;
  // return that;
}
Glyph.prototype.debug = function() {
  var that = this;
  for (var item in that.e) {
    log(item, that.e[item]);
  }
}
Glyph.prototype.hash = function() {
  var that = this, hash = "";
  for (var item in that.e) {
    hash += that.e[item];
  }
  return hash;
}
function Freq() {
  var result = {};
  Array.range(65,75).each(function(a) {
    result[String.fromCharCode(a).toLowerCase()] = 0;
  });
  return result;
}
Glyph.prototype.flipX = function() {
  var h = this.hash().swap(0, 1)
                     .swap(2, 4)
 /*flip on x-axis*/  .swap(5, 6)
                     .swap(7, 9)
                     .swap(10, 11)
  var g = new Glyph(h);
  return g;
}
Glyph.prototype.flipY = function() {
  var h = this.hash().swap(0, 10)
                     .swap(1, 11)
 /*flip on y-axis*/  .swap(2, 7)
                     .swap(3, 8)
                     .swap(4, 5)
  var g = new Glyph(h);
  return g;
}

Glyph.prototype.hasLoner = function() {
  var that = this, b, c, d = new Set(), loner = false;
  that.v.each(function(a) {
    for (var b in that.e) {
      if (b.indexOf(a) > -1 && that.e[b] === 1) {
        d.add(b);
      }
    }
  })
  d = Arrayfrom(d);
  if (d.length === 1) {
    return true;
  }

  d.each(function(a) {
    if (loner === false) {
      a = d.shift();
      var e = d.flatten();
      if (e.indexOf(a[0]) === -1 && e.indexOf(a[1]) === -1) {
        loner = true;
      }
    }
  })
  return loner;
}
Glyph.prototype.render = function() {
  var c = this.c;
  var hash = this.hash();
  var tempcolors = colors.clone().shuffle(), tempcolor;
  // c.square(0, 0, 100, 100, "white")

  coords.each(function(xy, i) {
    if (hash[i] === "0") {
      c.line(xy[0], xy[1], xy[2], xy[3], "black");
    }
  });
  coords.each(function(xy, i) {
    if (hash[i] === "1") {
      c.line(xy[0], xy[1], xy[2], xy[3], "white"); //tempcolors.shift())//,
    }
  });
  // if (this.hasLoner()) {c.square(0, 0, 100, 100, "rgba(255, 0, 0, .5)") }
  $(this.c.canvas).attr("hash", hash)

  return this.c.canvas;


}
var glyphs = [];
Array.interval("[0.."+(Math.pow(2, edges.length) - 1)+"]").each(function(i) {
  glyphs.push(new Glyph(i.base(2).pad(edges.length)));
});



