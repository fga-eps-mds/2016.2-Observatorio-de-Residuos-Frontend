class Marking < ActiveRecord::Base

validates :name, presence:true
validates :local, presence:true
validates :type, presence:true

end
