class UsersSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password, :birth_date, :city, :gender, :profile_type
end
