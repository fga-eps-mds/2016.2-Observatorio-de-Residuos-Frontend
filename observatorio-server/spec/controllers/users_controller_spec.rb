require 'rails_helper'

RSpec.describe UsersController, type: :controller do
	before :all do 
		User.destroy_all
		User.create! :id=>1, :first_name=>"test", :last_name=>"passed", :email=>"test@email.com", :password_digest=>"123456", :birth_date => nil, :city=>"df", :gender=>"mas", :profile_type=>"Estudante"
	end

	describe "GET verify_email" do
		it "Should render json with true param" do
			get :verify_email, :email => "test@email.com"
		    
		    expect(response.body).to eq({:userExist => true}.to_json)			
		end

		it "Should render json with false param" do
			get :verify_email, :email => "teste@email.com"
		    
		    expect(response.body).to eq({:userExist => false}.to_json)
		end
	end

	describe "POST create" do
	    it "should successfull create a user" do
	    	post :create, :user => {
				:first_name=>"test", 
				:last_name=>"passed", 
				:email=>"teste@email.com", 
				:password_digest=>"123456", 
				:birth_date => nil, 
				:city=>"df", 
				:gender=>"mas", 
				:profile_type=>"Estudante"
			} 

		    expect(response.body).to eq(User.last.to_json)
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


	      expect(response.status).to be(401)
	      expect(response.body).to eq({:error => "Incorrect credentials"}.to_json)
	    end
  	end
end
