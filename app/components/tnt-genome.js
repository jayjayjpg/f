import Ember from 'ember';
import { default as d33 } from 'd3v3';
import tntGenome from 'npm:tnt.genome'; // tntGenome === tnt.board

export default Ember.Component.extend({
  classNames: ['facade-element','tnt-genome'],
  tagName: ['article'],
  geneValue: "brca2",
  init(){
    this._super(...arguments);
    console.log("d3 from d3v3 shim tnt.genome: " + d33.version);
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
    console.log("gene track promise? " + JSON.stringify(gene_track));
    genome
      .zoom_in(50)
      .add_track(gene_track);

    return gene_track;

    
  },
  findGene(){
    console.log("1");
    let searchTerm = this.get('geneValue');
    console.log("2");
    let track = this.setupGenome(searchTerm);
    console.log("3");
    this.$('#genomeWrapper #tnt_genomeWrapper').remove();
    console.log("4");
    let genome = this.get('genome');
    console.log("5");
    genome(this.get('rootEl'));
    console.log("6");
    let returnVal = genome.start();
    console.log("7");
    console.log("return Val " + returnVal);
    console.log("8");
    console.log("current gene: " + genome.gene());
    console.log("9");
    this.$('.tnt_elem rect').attr('height', 60);
    console.log("10");
  },
  didInsertElement(){
    let genome = this.get('genome');
    let el = this.$("#genomeWrapper")[0];
    this.set('rootEl',el);
    genome(el);
    let returnVal = genome.start();
    console.log("return Val " + returnVal);
    
  },
  actions: {
    checkIt(){
      console.log("searching for the gene..." + this.get('geneValue'));
    }
  }
  
});
