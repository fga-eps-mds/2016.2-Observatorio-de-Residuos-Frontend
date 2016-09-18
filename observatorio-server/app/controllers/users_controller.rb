class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def new
    user = User.new
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: { error: 'Incorrect credentials' }, status: 401
      session[:user_id] = user.id
	    #redirect_to '/'
    else
      render json: { error: 'Incorrect credentials' }, status: 401
      #redirect_to '/signup'
      puts user.errors.messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest, :city, :gender, :profile_type)
  end
end
