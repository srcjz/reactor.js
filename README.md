# reactor.js

为什么一定要用HTML的语法来表达呢？这样还多了一层转换， 也不是纯粹的javascript了。出于这个想法， 我写了reactor.js。这对浏览器来说并没有增加什么负担， 从大小看reactor.js也只有1KB， 几乎可以忽略不计。

reactor.js是基于jml的， 当然这里对jml有特定的要求。简单来说， 其一般形式是这样：

```
[type, props, child1, child2, child3 ...]
```

其中type可以是一个字符串， 也可以是一个React组件， props是一个object， child可以是字符串、数字，或者一个jml。 props, child都可以省略。如果jml的第二个元素不是object， 程序会自动将其识别为child。因此这里的jml主要有以下几种形式：

```
[type]

[type, props]

[type, child1, child2, child3 ...]

[type, props, child1, child2, child3 ...]

```

以下是一些实例：

```
["div"]

["div", "Hello"]

["div", {class:"default"}, "Hi"]

[HelloMessage, "John", "!"]

["form", ["input"], ["button", "Add"]]
```

如何使用reactor.js?

* 首先，导入 **react.js** 和 **reactor.js**:

```js
<script src="react.min.js"></script>
<script src="reactor.js"></script>
```

* 然后用 **Ractor.createClass** 创建组件，和 React.creatClass不同的是， 这里要将 **render** 换成 **jml**， 并且返回的是一段jml：

```js
var Hello = Reactor.createClass({
	jml: function () {
		return ["div", "Hello"];
	}
});
```
* 最后用 **Ractor.render** 渲染，同样，第一个参数是jml而不是jsx：

```js
Reactor.render([Hello], document.getElementById('content'));
```


以下是两个实例：

## Hello Message

```js
var HelloMessage = Reactor.createClass({
    jml: function() {
        return ["div","Hello "].concat(this.props.children);
    }
});

Reactor.render([HelloMessage, "John"], document.getElementById('content'));
```


## Todo App

```js
var TodoList = Reactor.createClass({
    jml: function() {
        var createItem = function(itemText, index) {
            return ["li",{key:index + itemText}, itemText];
        };
        return ["ul"].concat(this.props.items.map(createItem));
    }
});

var TodoApp = Reactor.createClass({
    getInitialState: function() {
        return {items: [], text: ''};
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
    },

    jml: function() {

    return ["div", ["h3","TODO"],
              [TodoList, {items: this.state.items}],
              ["form",{onSubmit: this.handleSubmit},
                  ["input", {onChange: this.onChange, value: this.state.text}],
                  ["button", "Add #", this.state.items.length+1]]];
    }

});

Reactor.render([TodoApp], document.getElementById('content'));

```
