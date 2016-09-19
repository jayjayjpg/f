export function initialize(app) {
  app.register('d3:main', window.d3, {instantiate: false});
  app.inject('component:vertical-bar-chart', 'd3', 'd3:main');
}

export default {
  name: 'register-d3',
  initialize
};
