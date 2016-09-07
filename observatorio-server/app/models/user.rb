class User < ActiveRecord::Base
 has_secure_password

   VALID_NAME_FORMAT = (a-z|A-Z áéíóúÁÉÍÓÚçÇâôãõÂÔÃÕ)
   validates firstname, presence: true, length: {maximum: 30}, format: { with: VALID_NAME_FORMAT}
   validates lastname, presence: true, length: {maximum: 30}, format: { with: VALID_NAME_FORMAT}
   validates password, presence: true, length: {minimum: 6}
   validates password_confirmation, presence: true, length: {minimum: 6}
   VALID_EMAIL_FORMAT= /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
   validates email, presence: true, length: {maximum: 260}, format: { with: VALID_EMAIL_FORMAT}, uniqueness: {case_sensitive: false}
   before_save { self.email = email.downcase }
   DATE = /^(([012][0-9])|(3[01]))\/(0[1-9]|1[012])\/\d{4}$/
   validates :date_of_birth, timeliness: { on_or_before: lambda { Date.current }, type: :date }, presence: true, format: {with: DATE}
   validates city, presence: true
   validates gender, presence: true
   validates profile_type, presence: true

end
