class PevsController < ApplicationController
#   before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    render json: Pev.all
  end

  def create
    pev = Pev.new(pev_params)
    if pev.save
        render json: pev
    else
        render json: { error: 'Invalid parameters' }, status: 401
        puts pev.errors.messages
    end
  end

  private
  def pev_params
    params.require(:pev).permit(:name, :plastic, :paper, :metal, :glass, :location, :comment)
  end
end