class MilestonesForDemurrersController < ApplicationController

    def index
        milestones_for_demurrers = MilestonesForDemurrer.all
        render json: milestones_for_demurrers, status: :ok
    end

    def create
        milestone_for_demurrer = MilestonesForDemurrer.create!(case_params)
        render json: milestone_for_demurrer
    end

    private

    def case_params
        params.permit(:m1, :m2, :m3, :m4, :m5, :m6, :m7, :m8, :deadline_id)
    end

end
