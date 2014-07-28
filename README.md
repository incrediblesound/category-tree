Category Tree
=============

<strong>0.0.2</strong> Fixed makePath algorithm    
<strong>0.0.4</strong> Clean up and comment code    

This module automates the saving of specific categories for items based on the terminal category. The module finds the correct path through a data tree to the terminal category and sets the document properties according to that path. For example, if we set the module data thusly:

```javascript
var productTree = {products:{household:{appliance:{},electronics:{}},office:{computers:{},desk:{pens:{},stationary:{}}}}};
var names = ['department','category','subCategory'];
tree.setTreeData(productTree, names);
```
Then we can do this:
```javascript
new product({
    name: 'Letter Paper',
    description: 'High Quality Paper',
    price: '10$ per pack'
  }).save('stationary', function(err, data) { //the 'stationary' parameter in the save function indicates terminal category
    if(err) console.log(err);
    res.render('index');
  })
```
And the following object is saved to the database:
```javascript
{ subCategory: 'stationary',
  category: 'desk',
  department: 'office',
  name: 'Letter Paper',
  description: 'High Quality Paper',
  price: '10$ per pack',
  _id: 'not telling, so there' }
```
Notice how the category 'product' is not saved because it matches the schema name. You could add another tree like so:
```javascript
var productTree = {products:{...}, services:{...}};
```
to give your service objects their own categories, allthough for now they must have the same category names i.e. 'department','category' etc. I will try to make this more dynamic in future updates.

Detailed Use Instructions
-------------------------
Wherever you define your mongoose schema, require the module's plugin:
```javascript
var autoCat = require('mongoose-tree').autoCat;
```
Define your schema with all the correct category names and add the plugin as a... well, as a plugin.
```javascript
var Product = new Schema({
	name: String,
	description: String,
	price: String,
	department: String,
	category: String,
	subCategory: String
})

Product.plugin(autoCat);
```
Make sure to set the category tree and category names to the module's data:
```javascript
var tree = require('category-tree');

var productTree = {products:{household:{appliance:{},electronics:{}},office:{computers:{},desk:{pens:{},stationary:{}}}}};
var names = ['department','category','subCategory'];

tree.setTreeData(productTree, names);
```
Then save your document as in the example at the top, with the terminal category as the first argument to the save function.

## License

MIT