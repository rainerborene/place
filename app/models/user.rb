class User
  include DataMapper::Resource

  property :id, Serial
  property :uid, String, required: true
  property :name, String
  property :email, String, required: true
  property :profile_image, String, length: 100
  property :token, String, required: true, length: 255
  property :latitude, Float
  property :longitude, Float

  def self.from_omniauth(auth)
    first_or_new(email: auth.info.email).tap do |user|
      user.uid = auth.uid
      user.name = auth.info.name
      user.profile_image = auth.info.image
      user.token = auth.credentials.token
      user.save
    end
  end
end
