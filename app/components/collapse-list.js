import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['collapsible'],
  attributeBindings: ['data-collapsible'],
  dataCollapsible: 'accordion',
  didInsertElement(){
    this.$().collapsible();
  }
});
