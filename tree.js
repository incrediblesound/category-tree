
exports.autoCat = function(schema) {
  schema.pre('save', function (next,data, cb) {
    var names = treeData.levelNames;
    var path = makePath(treeData.tree, data);
    var me = this;
    forEach(path, function(cat, i) {
      me[names[i]] = cat;
    })
    next(cb);
  })
}

exports.setTreeData = function(tree, names) {
  treeData.tree = tree;
  treeData.levelNames = names;
  return;
}

var treeData = {
  tree: {},
  levelNames: [],
}

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
          if(!done) {
          if(key == destination) {
            track[root].push(destination);
            if(!done){ results.result = track[root]; done = true; }
            return;
          } else {
            track[root].push(key);
            return traverse(tree[key], destination, root);
          }
        } else { return }
        });
        if(!done){ track[root].pop(); }
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


