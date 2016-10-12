class CreateMarkings < ActiveRecord::Migration
  def change
    create_table :markings do |t|
      t.string :name
      t.string :local
      t.string :marking_type
      t.string :description

      t.timestamps null: false
    end
  end
end
