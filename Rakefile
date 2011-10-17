require 'rubygems'
require 'yui/compressor'

desc 'minify the javascript'
task :minify do
  compressor = YUI::JavaScriptCompressor.new({:munge => true})
  File.open("public/helper.js", "r") do |source|
    compressor.compress(source) do |compressed|
      File.open('public/helper.min.js', 'w') do |file|
        file.write(compressed.read());
      end
    end
  end
end

desc 'generates the javascript documentation ind /doc using JSDoc'
task :documentation do
  basepath = File.dirname(__FILE__)
  docoutputpath = File.join(basepath, 'doc')
  jsdocpath = File.join(basepath, 'external/jsdoc_toolkit-2.4.0/jsdoc-toolkit')
  jsdoctemplatepath = File.join(basepath, 'external/jsdoc-simple')
  srcFiles = ['helper.js'].collect {|filename| File.join(basepath, 'public', filename)}
  
  Dir.chdir(jsdocpath)
  command = `java -jar jsrun.jar app/run.js -p -a -t=#{jsdoctemplatepath} -d=#{docoutputpath} #{srcFiles.join(' ')}`
end


desc 'downloads and unpacks external dependencies'
task :dependencies do
  # TODO download jsdoc toolkit
  # http://jsdoc-toolkit.googlecode.com/files/jsdoc_toolkit-2.4.0.zip
end

desc 'prepares for a new tagged release'
task :release do
  # TODO minify, generate documentation, increment tag
end
    
