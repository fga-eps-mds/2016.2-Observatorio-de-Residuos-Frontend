class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
<<<<<<< Updated upstream
  before_filter :add_allow_credentials_headers
=======
<<<<<<< Updated upstream
  protect_from_forgery with: :exception
=======
  helper_method :current_user
  before_filter :add_allow_credentials_headers

	def current_user
	  current_user ||= User.find(session[:user_id]) if session[:user_id] #verifica se está logado
	end

  def require_user
	  redirect_to '/login' unless current_user 
	end

>>>>>>> Stashed changes
  def add_allow_credentials_headers
     response.headers['Access-Control-Allow-Origin'] = '*'
     response.headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
     response.headers['Access-Control-Request-Method'] = '*'
     response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
   end
   def options
     head :status => 200, :'Access-Control-Allow-Headers' => 'accept, content-type'
   end
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
end
