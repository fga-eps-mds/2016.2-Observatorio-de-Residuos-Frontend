class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.date   :birth_date
      t.string :city
      t.string :gender
      t.string :profile_type
      t.timestamps null: false
    end
  end
end
