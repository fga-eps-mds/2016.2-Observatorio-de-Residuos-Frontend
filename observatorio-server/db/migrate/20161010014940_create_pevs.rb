class CreatePevs < ActiveRecord::Migration
  def change
    create_table :pevs do |t|
      t.string :name
      t.string :location
      t.timestamps null: false
    end
  end
end
