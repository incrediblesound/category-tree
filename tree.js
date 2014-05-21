
exports.autoCat = function(schema) {
  schema.pre('save', function (next,data, cb) {
    var names = treeData.levelNames;
    var path = makePath(treeData.tree, data);
    console.log(path);
    var me = this;
    forEach(path, function(cat, i) {
      me[names[i]] = cat;
    })
    console.log(me);
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
	var results,
		track = {};
	function traverse(tree, destination, root) {
		var keys = Object.keys(tree);
		if(keys.length === 0) {
      track[root].pop();
			return;
		} else {
			forEach(keys, function(key) {
				if(key == destination) {
					track[root].push(destination);
          results = track[root];
					return;
				} else {
					track[root].push(key);
					return traverse(tree[key], destination, root);
				}
			})
      return;
		}
	}

	var roots = Object.keys(tree);
	forEach(roots, function (root) {
    track[root] = [];
		traverse(tree[root], destination, root);
	})
	return results;
}

function forEach(array, fn) {
	for(var i = 0; i < array.length; ++i) {
		fn(array[i], i);
	}
}