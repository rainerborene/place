$:.unshift __dir__
require 'json'
require 'bundler'
Bundler.require
Dotenv.load

require_relative 'config/database'

class Place < Sinatra::Base
  set :views, "app/views"
  set :root, __dir__

  set :session_secret, "blah"
  enable :sessions

  get '/' do
    erb :index
  end

  get '/api/users' do
    authorize!
    content_type :json
    User.all.to_json only: [:name, :profile_image, :latitude, :longitude]
  end

  put '/api/users/:id' do
    authorize!
    content_type :json
    attributes = JSON.parse(request.body.read.to_s)
    current_user.update({
      :latitude => attributes['latitude'],
      :longitude => attributes['longitude']
    })
  end
end

require_relative 'app/controllers/sessions_controller'
