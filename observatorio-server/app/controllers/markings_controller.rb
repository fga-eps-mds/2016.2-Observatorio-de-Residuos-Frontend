class MarkingsController < ApplicationController
  before_action :set_marking, only: [:show, :edit, :update, :destroy]

  def index
    render json: Marking.all
  end 

  def new
    marking = Marking.new
  end

  def create
    marking = Marking.new(marking_params)
    if marking.save
        render json: marking
    else
        render json: { error: 'Incorrect credentials' }, status: 401
        puts marking.errors.messages
    end
  end

  private
  def marking_params
    params.require(:marking).permit(:name, :local, :marking_type, :description)
  end
end
