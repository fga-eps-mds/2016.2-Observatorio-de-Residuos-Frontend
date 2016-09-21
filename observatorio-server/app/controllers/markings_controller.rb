class MarkingsController < ApplicationController

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
    params.require(:marking).permit(:name, :local, :tipo, :comment)
  end

end
