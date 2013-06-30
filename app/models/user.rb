class User
  include DataMapper::Resource

  property :id, Serial
  property :uid, String
  property :token, String
  property :email, String
  property :latitude, Float
  property :longitude, Float
end
