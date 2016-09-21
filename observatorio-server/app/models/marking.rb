class Marking < ActiveRecord::Base

validates :name, presence:true
validates :local, presence:true
validates :tipo, presence:true

end
