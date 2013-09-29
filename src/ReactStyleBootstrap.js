var ReactStyle = require('./ReactStyle');

function handleStyleChange() {
  var components = ReactStyle.renderToComponents();

  // Poor man's reconciler that never unloads.
  components.forEach(function(component) {
    var node = document.getElementById(component.props.id);
    if (!node) {
      node = document.createElement('style');
      node.setAttribute('id', component.props.id);
      document.head.appendChild(node);
    }
    node.innerHTML = component.props.dangerouslySetInnerHTML.__html;
  });
}

var ReactStyleBootstrap = {
  bootstrap: function() {
    handleStyleChange();
    ReactStyle.addEventListener('change', handleStyleChange);
  }
};

module.exports = ReactStyleBootstrap;