$:<<(File.join(File.dirname(__FILE__), 'lib'))

require 'rubygems' # required for ruby 1.8 and jruby
require 'mongo'
require 'sinatra'
require 'lorem'

get '/time' do
  Time.now.to_s
end

get '/:page' do
  erb params[:page].to_sym
end
