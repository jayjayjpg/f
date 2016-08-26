import Ember from 'ember';
//import d3 from 'd3';
import tntGenome from 'npm:tnt.genome'; // tntGenome === tnt.board

export default Ember.Component.extend({
  classNames: ['facade-element','tnt-genome'],
  tagName: ['article'],
  geneValue: "brca2",
  init(){
    this._super(...arguments);
    this.setupGenome(this.get('geneValue'));
  },
  setupGenome(geneValue){
    let genome = tntGenome.genome().species("human").gene(geneValue).width(950);
    this.set('genome', genome);
    let gene_track = tntGenome.track()
        .height(500)
        .color("transparent")
        .display(tntGenome.track.feature.genome.gene()
            .color("#550055")
        )
        .data(tntGenome.track.data.genome.gene());

    genome
      .zoom_in(50)
      .add_track(gene_track);

    
  },
  findGene(){
    let searchTerm = this.get('geneValue');
    this.setupGenome(searchTerm);

    this.$('#genomeWrapper #tnt_genomeWrapper').remove();

    let genome = this.get('genome');
    genome(this.get('rootEl'));
    genome.start();
    this.$('.tnt_elem rect').attr('height', 60);
  },
  didInsertElement(){
    let genome = this.get('genome');
    let el = this.$("#genomeWrapper")[0];
    this.set('rootEl',el);
    genome(el);
    genome.start();
    
  },
  actions: {
    checkIt(){
      console.log("searching for the gene..." + this.get('geneValue'));
    }
  }
  
});
