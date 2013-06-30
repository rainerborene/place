require 'spec_helper'

describe Place do
  describe 'GET index' do
    before { get '/' }
    it { last_response.should be_ok }
  end
end
