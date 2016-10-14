import DS from 'ember-data';

export default DS.Model.extend({
  x: DS.attr('string'),
  value: DS.attr('number'),
  y: DS.attr('string')
});
