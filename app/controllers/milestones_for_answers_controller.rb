class MilestonesForAnswersController < ApplicationController

    def index
        milestones_for_answers = MilestonesForAnswer.all
        render json: milestones_for_answers, status: :ok
    end

end
