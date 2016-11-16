import DS from 'ember-data';

export default DS.Model.extend({
 actor: DS.attr('string'),
 actorId: DS.attr('string'),
 target: DS.attr('string'),
 targetSnp: DS.attr('string')
});
