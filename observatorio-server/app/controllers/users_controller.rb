class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def show,
    current_user = User.find_by_token(params[:current_user_token])
    user = User.find_by_token(params[:token])
    is_following = current_user.following?(user)
    matched = current_user.matched?(user)
    blocked = current_user.blocked?(user)
  end

  def create,
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: { error: 'Incorrect credentials' }, status: 401
    end
  end

  def update
    user = User.find_by_token(params[:token])
    if user
      user.age
      if user.update(user_params)
        user.email_activate
        render json: user
      else
        render json: { error: 'Incorrect credentials' }, status: 401
      end
    end
  end

  private
  def set_user
    user = User.find_by_token(params[:token])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest,
     :birth_date, :city, :gender, :profile_type)
  end


  def update_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest,
     :birth_date, :city, :gender, :profile_type)
  end

end
