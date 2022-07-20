class MilestonesForDemurrerSerializer < ActiveModel::Serializer
  attributes :id, :m1, :m2, :m3, :m4, :m5, :m6, :m7, :m8, :deadline_id
  
  belongs_to :deadline
end
