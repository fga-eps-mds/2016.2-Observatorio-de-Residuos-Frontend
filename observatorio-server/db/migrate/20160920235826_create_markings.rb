class CreateMarkings < ActiveRecord::Migration
  def change
    create_table :markings do |t|
      t.string :name
      t.string :local
      t.string :type
      t.string :comment
      t.string :picture

      t.timestamps null: false
    end
  end
end
