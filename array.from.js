Array.from = function(list, index) {
  var array = []
  index = index || 0
  for (var i = index || 0; i < list.length; i++) {
    array[i - index] = list[i]
  }
  return array
}