import Ember from 'ember';
// import cyqtip from 'cytoscape-qtip';


export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['facade-element', 'cytoscape-graph'],
  elementData: null,
  didInsertElement(){
    let container = this.$();
    this.$('.tooltipped').tooltip({delay: 50});
    // cyqtip( cytoscape, jquery );

    container[0].style.left = 0;
    container[0].style.top = 0;
    container[0].style.width = "100%";
    container[0].style.height = "400px";
    container[0].style.position = "relative";
    

    var cy = cytoscape({
      container: container,
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(id)'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          })
        .selector('.highlighted')
          .css({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
          }),
      elements: this.get('elementData'),
      layout: {
        name: 'concentric',
        directed: true,
        roots: '#a',
        padding: 10
      },
      zoom: 1,
      zoomingEnabled: false
    });
    
    cy.on('mouseover', 'node', function(event) {
        var node = event.cyTarget;
        console.log("the node: " + event.cyTarget);
        node.qtip({
            content: 'hello',
            show: {
                event: event.type,
                ready: true
            },
            hide: {
                event: 'mouseout unfocus'
            }
        }, event);
    });
    
    console.log("qtip obj defined?: " + this.$().qtip());

  }
});
