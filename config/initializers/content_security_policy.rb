# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy

Rails.application.config.content_security_policy do |policy|
  #   policy.default_src :self, :https
  #   policy.font_src    :self, :https, :data
  #   policy.img_src     :self, :https, :data
  #   policy.object_src  :none
  #   policy.script_src  :self, :https
  #   policy.style_src   :self, :https

  #   # Specify URI for violation reports
  #   # policy.report_uri "/csp-violation-report-endpoint"
  if Rails.env.development?
    policy.connect_src(
      :self,
      :https,
      'http://localhost:3035',
      'ws://localhost:3035',
    )
  end
end

# If you are using UJS then enable automatic nonce generation
# generator = -> request { SecureRandom.base64(16) }
# Rails.application.config.content_security_policy_nonce_generator = generator

# Report CSP violations to a specified URI
# Rails.application.config.content_security_policy_report_only = true
