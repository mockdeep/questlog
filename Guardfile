# A sample Guardfile
# More info at https://github.com/guard/guard#readme

group :everything, halt_on_fail: true do
  guard 'rspec', cmd: 'spring rspec', failed_mode: :keep do
    watch(/^spec\/.+_spec\.rb$/)

    watch(/^app\/(.+)\.rb$/) { |m| "spec/#{m[1]}" }
    watch(/^lib\/(.+)\.rb$/) { |m| "spec/lib/#{m[1]}" }
  end

  guard :rubocop, all_on_start: false, cli: ['-D'] do
    watch(/bin\/*/)
    watch(/.+\.rb$/)
    watch(/.+\.rake$/)
    watch(/.+\.ru$/)
    watch(/(?:.+\/)?\.rubocop\.yml$/) { |m| File.dirname(m[0]) }
  end
end
