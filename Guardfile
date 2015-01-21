# A sample Guardfile
# More info at https://github.com/guard/guard#readme

group :everything, halt_on_fail: true do
  guard 'rspec', cmd: 'spring rspec', failed_mode: :keep do
    watch(%r{^spec/.+_spec\.rb$})

    watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}" }
    watch(%r{^lib/(.+)\.rb$})                           { |m| "spec/lib/#{m[1]}" }
  end

  guard :rubocop, all_on_start: false, cli: ['-D'] do
    watch(%r{.+\.rb$})
    watch(%r{.+\.rake$})
    watch(%r{.+\.ru$})
    watch(%r{(?:.+/)?\.rubocop\.yml$}) { |m| File.dirname(m[0]) }
  end
end
