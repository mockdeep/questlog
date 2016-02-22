if ENV['CIRCLECI']
  require 'rspec_junit_formatter'

  RSpec.configure do |config|
    output_path = File.join(ENV['CIRCLE_TEST_REPORTS'], 'rspec', 'junit.xml')
    # second arg to `#add_formatter` is private rspec api, so watch for breakage
    config.add_formatter(RspecJunitFormatter, output_path)
  end
end
