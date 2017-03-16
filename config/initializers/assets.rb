Rails.application.config.assets.version = '1.2'
Rails.application.config.assets.paths += [
  # paths for CSS assets in node_modules directory
  Rails.root.join('node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
]
