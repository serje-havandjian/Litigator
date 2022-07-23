class DeadlinesController < ApplicationController

    def index
        deadlines = Deadline.all
        render json: deadlines, status: :ok
    end

    def show
        deadline = Deadline.find(params[:id])
        render json: deadline, status: :ok
    end

    def create
        deadline = Deadline.create!(case_params)
        render json: deadline
    end

    private

    def case_params
        params.permit(:title, :deadline, :case_id, :trigger_id)
    end


end
