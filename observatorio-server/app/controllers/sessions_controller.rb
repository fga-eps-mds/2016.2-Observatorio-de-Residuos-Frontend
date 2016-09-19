class SessionsController < ApplicationController
  def new
	end

  def create
	  user = User.find_by_email(params[:email])
	  if user && user.password_digest == params[:password]
	    session[:user_id] = user.id
	    render json: user
	  end
	end
  
  def destroy
	  session[:user_id] = nil
	  redirect_to '/'
	end

end
