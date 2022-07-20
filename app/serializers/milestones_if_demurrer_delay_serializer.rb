class MilestonesIfDemurrerDelaySerializer < ActiveModel::Serializer
  attributes :id, :m1, :m2, :m3, :m4, :deadline_id
  
  belongs_to :deadline
end
