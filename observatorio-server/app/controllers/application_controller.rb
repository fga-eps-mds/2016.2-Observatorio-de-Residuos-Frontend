class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :add_allow_credentials_headers

  def add_allow_credentials_headers
     response.headers['Access-Control-Allow-Origin'] = '*'
     response.headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
     response.headers['Access-Control-Request-Method'] = '*'
     response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   end
   def options
     head :status => 200, :'Access-Control-Allow-Headers' => 'accept, content-type'
   end

end
