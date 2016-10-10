class User < ActiveRecord::Base

   VALID_NAME_FORMAT= /[a-z|A-Z áéíóúÁÉÍÓÚçÇâôãõÂÔÃÕ]/
   validates :first_name, presence: true, length: {maximum: 30}, format: { with: VALID_NAME_FORMAT}
   validates :last_name, presence: true, length: {maximum: 30}, format: { with: VALID_NAME_FORMAT}

   VALID_EMAIL_FORMAT= /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
   validates :email, presence: true, length: {maximum: 260}, format: { with: VALID_EMAIL_FORMAT}, uniqueness: true
   before_save { self.email = email.downcase }
   #DATE = /\A(?:0?[1-9]|1[0-2])\/(?:0?[1-9]|[1-2]\d|3[01])\/\d{4}\Z/
   #validates :birth_date, :timeliness { on_or_before: lambda { Date.current }, type: :date }, presence: true, format: {with: DATE}
   validates :city, presence: true
   validates :gender, presence: true
   validates :profile_type, presence: true

end
