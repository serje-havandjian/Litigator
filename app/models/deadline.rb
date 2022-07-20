class Deadline < ApplicationRecord

    belongs_to :case
    belongs_to :trigger

    has_many :milestones_for_answers
    has_many :milestones_for_demurrers
    has_many :milestones_if_demurrer_delays

end
