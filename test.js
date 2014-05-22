function makePath(tree, destination) {
    
    var results = {result: []},
        done = false,
        track = {};

  var roots = Object.keys(tree);
  forEach(roots, function (root) {
    track[root] = [];
    traverse(tree[root], destination, root);
  });
    
    function traverse(tree, destination, root) {
      var keys = Object.keys(tree);
    if(keys.length === 0) {
      track[root].pop();
      return;
    } else {
      forEach(keys, function(key) {
        if(key == destination) {
          track[root].push(destination);
          if(!done){ results.result = track[root]; done = true; }
          return;
        } else {
          track[root].push(key);
          return traverse(tree[key], destination, root);
        }
      });
      if(!done){ track[root].pop();}
      return;
    }
  }
  return results.result;
}

function forEach(array, fn) {
  for(var i = 0; i < array.length; ++i) {
    fn(array[i], i);
  }
}

var productTree = {products:{household:{appliance:{},electronics:{}},office:{computers:{},desk:{pens:{},stationary:{}}}}};

var x = makePath(productTree,'stationary');
console.log(x);