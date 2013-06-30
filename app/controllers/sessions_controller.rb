class Place < Sinatra::Base
  OmniAuth.config.on_failure = Proc.new do |env|
    [200, {}, [env['omniauth.error'].inspect]]
  end

  get '/auth/failure' do
    'Authentication Failed'
  end

  get '/auth/facebook/callback' do
    erb "<h1>#{params[:provider]}</h1>
         <pre>#{JSON.pretty_generate(request.env['omniauth.auth'])}</pre>"
  end

  get '/auth/facebook/deauthorized' do
    "#{params[:provider]} has deauthorized this app."
  end

  get '/logout' do
    session.clear
    redirect '/'
  end
end
