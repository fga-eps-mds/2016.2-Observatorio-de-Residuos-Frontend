class CreatePevs < ActiveRecord::Migration
  def change
    create_table :pevs do |t|
      t.string :name
      t.string :paper
      t.string :plastic
      t.string :metal
      t.string :glass
      t.string :comment
      t.string :location 
      t.timestamps null: false
    end
  end
end
