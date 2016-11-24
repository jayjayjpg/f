import Ember from 'ember';
/* globals cytoscape */

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['facade-element', 'cytoscape-graph'],
  elementData: null,
  cHeight: 800,
  snpLabel: Ember.computed('affectedSnps', function(){
    return this.get('affectedSnps');
  }),
  affectedSnps: null,
  didInsertElement(){

    let container = this.$();

    container[0].style.left = 0;
    container[0].style.top = 0;
    container[0].style.width = "100%";
    container[0].style.height = `${this.get('cHeight')}px`;
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
      zoom: 0.2,
      zoomingEnabled: true
    });
    

    cy.on('click', 'node', (event) => {
        /*var node = event.cyTarget;
        $(node).qtip({
          content: node.data("label")
        }); */
        this.set('affectedSnps', event.cyTarget.data("label"));
        console.log("associated label: "  + event.cyTarget.data("label"));
        
    });

    
    /* cy.$('node').qtip({
        content: "label node"
     }); */
    
    // console.log("qtip obj defined?: " + this.$().qtip());

  }
});
