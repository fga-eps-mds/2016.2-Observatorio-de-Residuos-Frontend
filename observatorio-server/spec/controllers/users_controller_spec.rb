require 'rails_helper'

RSpec.describe UsersController, type: :controller do


	describe "POST create" do
	    it "should successfull create a user" do
	      post :create, :user => {
			:first_name=>"test", 
			:last_name=>"passed", 
			:email=>"test@email.com", 
			:password_digest=>"123456", 
			:birth_date => nil, 
			:city=>"df", 
			:gender=>"mas", 
			:profile_type=>"Estudante"
	      }

	      JSON.parse(response.body)["first_name"] == "test"
          JSON.parse(response.body)["last_name"] == "passed"
          JSON.parse(response.body)["email"] == "test@email.com"
          JSON.parse(response.body)["password_digest"] == "test"
          JSON.parse(response.body)["city"] == "df"
          JSON.parse(response.body)["gender"] == "mas"
          JSON.parse(response.body)["profile_type"] == "Estudante"
	    end

	    it "should not successfull create a user" do
	      post :create, :user => {
	        :first_name=>"test", 
			:last_name=>"passed", 
			:email=>"testemailm", 
			:password_digest=>"123456", 
			:birth_date => nil, 
			:city=>"df", 
			:gender=>"mas", 
			:profile_type=>"Estudante"
	      }

          JSON.parse(response.body)["status"] == 401
          JSON.parse(response.body)["error"] == "Incorrect credentials"
	    end
  	end
end
