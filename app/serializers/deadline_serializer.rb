class DeadlineSerializer < ActiveModel::Serializer
  attributes :id, :title, :deadline, :case_id, :trigger_id

    belongs_to :case
    belongs_to :trigger

    has_many :milestones_for_answers
    has_many :milestones_for_demurrers
    has_many :milestones_if_demurrer_delays
end
