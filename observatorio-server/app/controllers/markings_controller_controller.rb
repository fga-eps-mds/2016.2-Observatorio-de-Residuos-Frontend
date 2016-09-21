class MarkingsControllerController < ApplicationController

  def create
    marking = Markings.new(marking_params)
    if marking.save
      render json: marking
    else
      render json: { error: 'Incorrect credentials' }, status: 401
      puts marking.errors.messages
    end
  end

  private
  def marking_params
    params.require(:marking).permit(:name, :local, :type, :comment, :picture)
  end

end
