class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def new
    user = User.new
  end

  def verify_email
      user = User.find_by_email(params[:email])
      if(user == nil)
          puts "Usuário já existe"
      else
          user.create
      end

  end

  def create

    user = User.new(user_params)
    if user.save
        render json: user
    else
        render json: { error: 'Incorrect credentials' }, status: 401
        puts user.errors.messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password_digest, :city, :gender, :profile_type)
  end
end
