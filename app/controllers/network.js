import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['rsId'],
  rsId: null,
  uniqueInteractions: Ember.computed('model.interactions', function(){
    return this.get('model').interactions.uniqBy('actor');
  }),
  uniqueNodes: Ember.computed('uniqueInteractions', function(){
    let actors = this.get('uniqueInteractions');
    let uniqNodes = [];
    actors.forEach(function(interaction){
      uniqNodes.push({title: interaction.get('actor'), subtitle: ''});
      uniqNodes.push({title: interaction.get('target'), subtitle: interaction.get('targetSnp')});
    });
    return uniqNodes.uniq();
  }),
  nodesAvailable: Ember.computed.notEmpty('uniqueNodes'),
  cytoInteractions: Ember.computed('content.interactions', function(){
    /* return { nodes: [
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
          ]};*/
    let data = this.get('uniqueInteractions').toArray();
    let res = {};
    res.nodes = [];
    res.edges = [];
    data.forEach(function(obj){
      let node = {},
        edge = {},
        actorToTarget = obj.get('actor') + obj.get('target');
      // node.data = { id: obj.get('actor') };
      edge.data = { id: actorToTarget, weight: 1, source: obj.get('actor'), target: obj.get('target') };
      // res.nodes.push(node);
      res.edges.push(edge);
    });

    let uniqNodes = this.get('uniqueNodes');
    res.nodes = uniqNodes.map(function(obj){
      return { data: { id: obj.title, label: obj.subtitle }, classes: 'node cy-node'};
    });
    console.log("cytos: " + JSON.stringify(res));
    return res;
  })
});
