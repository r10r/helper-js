require 'rubygems'
require 'jsmin_c'
require 'packr'

task :minify do
  code = File.read('public/helper.js')
  compressed = Packr.pack(code, :shrink_vars => true, :base62 => true)
  File.open('public/helper.min.js', 'wb') { |f| f.write(compressed) } 
=begin
  minifier = JSMin.new
  original = File.read('public/helper.js')
  minified = minifier.minimize(original)
  File.open('public/helper.min.js', 'w') do |file|
    file.write(minified)
  end
=end
end
    