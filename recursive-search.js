function searchForString(regexp, object, maxDepth, doneList) {
  var maxDepth = maxDepth == undefined ? 10 : maxDepth;
  var doneList = doneList || [];
  var foundInPathList = [];

  function _searchForString(object, maxDepth, path) {
    doneList.push(object);
    for (var key in object) {
      try {
        var value = object[key];
        if (typeof value == 'string') {
          if (regexp.exec(value)) {
            foundInPathList.push(path + key);
          }
        } else if (maxDepth > 0 && (typeof value == 'object' || typeof value == 'function') && doneList.indexOf(value) == -1) {
          _searchForString(value, maxDepth - 1,path + key+'.');
        }
      } catch (e) {
        // nothing to do
      }
    }
  }

  _searchForString(object, maxDepth, '');

  return foundInPathList;
}

function searchForString2(regexp, object, maxDepth, doneList) {
  var maxDepth = maxDepth == undefined ? 10 : maxDepth;
  var doneList = doneList || [];
  var foundInPathList = [];
  doneList.push(object);
  for (var key in object) {
    try {
      var value = object[key];
      if (typeof value == 'string') {
        if (regexp.exec(value)) {
          foundInPathList.push(key);
        }
      } else if (maxDepth > 0 && (typeof value == 'object' || typeof value == 'function') && doneList.indexOf(value) == -1) {
        foundInPathList = foundInPathList.concat(searchForString(regexp, value, maxDepth - 1,
          doneList
        ).
          map(function (path) {
            return key + '.' + path;
          })
        )
        ;
      }
    } catch (e) {
      // nothing to do
    }
  }
  return foundInPathList;
}