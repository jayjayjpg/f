import DS from 'ember-data';

export default DS.Model.extend({
  col: DS.attr('number'),
  row: DS.attr('number'),
  label: DS.attr('string'),
  score: DS.attr('number'),
  row_label: DS.attr('string')
});
