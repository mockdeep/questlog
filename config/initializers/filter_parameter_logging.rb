# Be sure to restart your server when you modify this file.

# Configure sensitive parameters which will be filtered from the log file.
filtered_params = %i[password password_confirmation]
Rails.application.config.filter_parameters += filtered_params
