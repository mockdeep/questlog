Rails.application.config.assets.version = '1.2'
Rails.application.config.assets.paths += [
  # path to enable namespacing require paths, e.g.: `require('js/router')`
  Rails.root.join('app', 'assets'),
  # paths for CSS assets in node_modules directory
  Rails.root.join('node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
]
