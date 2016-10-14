class UsersController < ApplicationController
#   before_action :set_user, only: [:show, :edit, :update, :destroy]

  def verify_email
      user = User.find_by_email(params[:email])
      if(user == nil)
          render json: {"userExist": false}
      else
          render json: {"userExist": true}
      end
  end

  def create
    user = User.new(user_params)
    if user.save
        render json: user
    else
        render json: { error: 'Incorrect credentials' }, status: 401
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :city, :gender, :profile_type, :password_digest)
  end
end
