# A sample Guardfile
# More info at https://github.com/guard/guard#readme

group :everything, halt_on_fail: true do
  guard 'zeus' do
    watch(%r{^spec/.+_spec\.rb$})
    watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}" }
    watch(%r{^app/(.+)\.haml$})                         { |m| "spec/#{m[1]}.haml_spec.rb" }
    watch(%r{^lib/(.+)\.rb$})                           { |m| "spec/lib/#{m[1]}" }
    watch(%r{^app/controllers/(.+)_controller\.rb$})  { |m| "spec/controllers/#{m[1]}_controller" }
  end

  guard 'rspec', cmd: 'zeus rspec', failed_mode: :keep do
    watch(%r{^spec/.+_spec\.rb$})

    watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}" }
    watch(%r{^app/(.+)\.haml$})                         { |m| "spec/#{m[1]}.haml_spec.rb" }
    watch(%r{^lib/(.+)\.rb$})                           { |m| "spec/lib/#{m[1]}" }

    watch(%r{^app/views/(.+)/.*\.(erb|haml)$})          { |m| "spec/features/#{m[1]}_spec.rb" }
  end

  guard :rubocop, all_on_start: false, cli: ['-D'] do
    watch(%r{.+\.rb$})
    watch(%r{.+\.rake$})
    watch(%r{.+\.ru$})
    watch(%r{(?:.+/)?\.rubocop\.yml$}) { |m| File.dirname(m[0]) }
  end
end
