class DeadlineSerializer < ActiveModel::Serializer
  attributes :id, :title, :deadline, :case_id, :trigger_id
end
