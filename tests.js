var testObject = {
  func: Math.sin,
  number: 1234,
  nameOfBoy: "My name is marco.",
  nameOfGirl: "My name is nora.",
  obj: {
    animal: 'dog',
    obj: {
      animal: 'cat'
    }
  },
  array: ['tree', {flower: 'rose'}]
};

var objectWithLoop = {
  obj: {
    name: 'marco'
  }
};

objectWithLoop.obj.backToRoot = objectWithLoop;


test("search string directly", function () {
  deepEqual(searchForString(/marco/, testObject), ['nameOfBoy']);
  deepEqual(searchForString(/nora/, testObject), ['nameOfGirl']);
  deepEqual(searchForString(/janis/, testObject), []);
});

test("search string in nested objects", function () {
  deepEqual(searchForString(/dog/, testObject), ['obj.animal']);
  deepEqual(searchForString(/cat/, testObject), ['obj.obj.animal']);
});

test("search string in arrays", function () {
  deepEqual(searchForString(/tree/, testObject), ['array.0']);
  deepEqual(searchForString(/rose/, testObject), ['array.1.flower']);
});

test("avoid endless loops", function () {
  deepEqual(searchForString(/marco/, objectWithLoop), ['obj.name']);
});

test("search in window object", function () {
  deepEqual(searchForString(/Recursive Search Test/, window, 1), ['document.title']);
});

test("search in jquery", function () {
  deepEqual(searchForString(/1\.10\.1/, $, 3), ['fn.jquery']);
  deepEqual(searchForString(/1\.10\.1/, window, 6), ['$.fn.jquery']);
});
