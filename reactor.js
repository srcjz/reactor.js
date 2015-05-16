function checkType(object) {
    var objectTypeName = toString.apply(object).replace("]","").split(" ")[1];
    var types = Array.prototype.slice.call(arguments).slice(1);

    return (types.indexOf(objectTypeName)>=0);
}

var Reactor = {};

Reactor.createClass = function(spec) {
    spec.render = function() {
      return Reactor.render(this.jml(), null);
    }
    return React.createClass(spec);
}

Reactor.render = function(jml, container, callback) {
    if (!checkType(jml,"Array")) {
        return jml;
    }

    var type = jml[0];
    var props, children;

    if  (jml.length>1 && checkType(jml[1], 'Object')) {
        props = jml[1];
        children = jml.slice(2) || [];
    } else {
        props = null;
        children = jml.slice(1) || [];
    }

    var advancedChildren = [];
    for (key in children) {
        advancedChildren.push(Reactor.render(children[key], null, callback));
    }

    var element = React.createElement.apply(null, [type, props].concat(advancedChildren));

    return container? React.render(element, container, callback): element;
}
