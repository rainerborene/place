require 'bundler'
Bundler.require
Dotenv.load

require_relative 'config/data_mapper'
require_relative 'app/models/user'

DataMapper.finalize

class Place < Sinatra::Base
  set :views, "app/views"
  set :root, File.dirname(__FILE__)

  enable :sessions
  enable :logging

  use OmniAuth::Builder do
    provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'],
      scope: "email,read_friendlists,offline_access,publish_stream"
  end

  get '/' do
    erb :index
  end

  run! if app_file == $0
end

require_relative 'app/controllers/sessions_controller'
