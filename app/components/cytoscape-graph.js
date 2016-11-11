import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['facade-element', 'cytoscape-graph'],
  didInsertElement(){
    let container = this.$();
    
    console.log("why container?" + container);

    container[0].style.left = 0;
    container[0].style.top = 0;
    container[0].style.width = "100%";
    container[0].style.height = "600px";
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
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
          })
        .selector('.highlighted')
          .css({
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
          }),
      elements: {
          nodes: [
            { data: { id: 'a' } },
            { data: { id: 'b' } },
            { data: { id: 'c' } },
            { data: { id: 'd' } },
            { data: { id: 'e' } }
          ], 
          edges: [
            { data: { id: 'a"e', weight: 1, source: 'a', target: 'e' } },
            { data: { id: 'ab', weight: 3, source: 'a', target: 'b' } },
            { data: { id: 'be', weight: 4, source: 'b', target: 'e' } },
            { data: { id: 'bc', weight: 5, source: 'b', target: 'c' } },
            { data: { id: 'ce', weight: 6, source: 'c', target: 'e' } },
            { data: { id: 'cd', weight: 2, source: 'c', target: 'd' } },
            { data: { id: 'de', weight: 7, source: 'd', target: 'e' } }
          ]
        },
      layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
      },
      zoom: 1,
      zoomingEnabled: false
    });

  }
});
