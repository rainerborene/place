ENV['RACK_ENV'] = 'test'
require File.expand_path('../../app.rb', __FILE__)
Bundler.require :test

RSpec.configure do |conf|
  conf.include Rack::Test::Methods
end

def app
  Place
end
