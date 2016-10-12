import DS from 'ember-data';

export default DS.Model.extend({
  rsId: DS.attr('string'),
  genomicRegion: DS.attr('string')
});
