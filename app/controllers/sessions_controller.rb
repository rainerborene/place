class Place < Sinatra::Base
  use OmniAuth::Builder do
    provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'],
      scope: "email,read_friendlists,offline_access,publish_stream"
  end

  helpers do
    def authorize!
      halt 410 unless authenticated?
    end

    def authenticated?
      !session[:user_id].nil?
    end

    def current_user
      @current_user ||= User.get session[:user_id]
    end
  end

  get '/auth/facebook/callback' do
    user = User.from_omniauth request.env['omniauth.auth']
    session[:user_id] = user.id
    redirect to('/')
  end

  get '/auth/facebook/deauthorized' do
    "Facebook has deauthorized this app."
  end

  get '/auth/failure' do
    'Authentication Failed'
  end

  get '/logout' do
    session.clear
    redirect to('/')
  end
end
