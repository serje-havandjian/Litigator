class CaseSerializer < ActiveModel::Serializer
  attributes :id, :name, :counsel, :date_case_filed, :date_complaint_served

    has_many :deadlines
    has_many :triggers, through: :deadlines

end
