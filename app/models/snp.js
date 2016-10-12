import DS from 'ember-data';

export default DS.Model.extend({
  rsId: DS.attr('number'),
  genomicRegion: DS.attr('string')
});
