$:<<(File.join(File.dirname(__FILE__), 'lib'))

require 'rubygems' # required for ruby 1.8 and jruby
gem 'tilt','=1.2.2' # sinatra erb support doesn't work with tilt 1.3.x
require 'mongo'
require 'sinatra'

get '/time' do
  Time.now.to_s
end

post '/name' do
  params[:firstname] + " " + params[:lastname]
end

get '/name' do
  params[:firstname] + " " + params[:lastname]
end

get '/:page' do
  erb params[:page].to_sym
end