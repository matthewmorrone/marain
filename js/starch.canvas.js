function Canvas(w, h) {
    this.canvas = create("canvas")
    this.canvas.width = this.width = w || 100
    this.canvas.height = this.height = h || 100
    this.context = this.canvas.getContext("2d")
    this.c = this.context
    return this
}
Canvas.prototype.clear = function() {
    this.c.clearRect(0, 0, this.width, this.height)
    return this
}
Canvas.prototype.line = function(x1, y1, x2, y2, color, width) {
    if (x1.isArray()) {
        color = y1 || "black"
        width = x2 || 5
        y1 = x1.y1
        x2 = x1.x2
        y2 = x1.y2
        x1 = x1.x1
    }
    this.c.beginPath()
    this.c.moveTo(x1, y1)
    this.c.lineTo(x2, y2)
    this.c.strokeStyle = color || "black"
    this.c.lineWidth = width || 5
    this.c.stroke()
    this.c.closePath()
    return this
}
Canvas.prototype.circle = function(x, y, r, w, color, fill) {
    this.c.beginPath();
    this.c.arc(x, y, r, 0, 2 * Math.PI, false);
    this.c.lineWidth = w || 5
    this.c.strokeStyle = color || "white"
    this.c.stroke()
    if (fill) {
        this.c.fillStyle = fill// || "black"
        this.c.fill()
    }
    return this
}
Canvas.prototype.square = function(x, y, e, w, color, fill) {
    this.c.beginPath()
    this.c.rect(x, y, e, e)
    this.c.lineWidth = w || 5
    this.c.strokeStyle = color || "white"
    this.c.stroke()
    if (fill) {
        this.c.fillStyle = fill
        this.c.fillRect(x, y, e, e)
    }
    return this
}