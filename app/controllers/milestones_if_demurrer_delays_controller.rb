class MilestonesIfDemurrerDelaysController < ApplicationController


    def index
        milestones_if_demurrer_delays = MilestonesIfDemurrerDelay.all
        render json: milestones_if_demurrer_delays, status: :ok
    end

    def create
        milestones_if_demurrer_delay = MilestonesIfDemurrerDelay.create!(case_params)
        render json: milestones_if_demurrer_delay
    end

    private

    def case_params
        params.permit(:m1, :m2, :m3, :m4, :deadline_id)
    end

end
