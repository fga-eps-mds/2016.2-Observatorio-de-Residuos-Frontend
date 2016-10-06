class AddLatitudeToMarkings < ActiveRecord::Migration
  def change
    add_column :markings, :latitude, :string
    add_column :markings, :longitude, :string
  end
end 
