class TriggersController < ApplicationController

    def index
        triggers = Trigger.all
        render json: triggers, status: :ok
    end

    def show
        trigger = Trigger.find(params[:id])
        render json: trigger, status: :ok
    end

    def create
        trigger = Trigger.create!(case_params)
        render json: trigger
    end

    private

    def case_params
        params.permit(:title, :date_served, :method_of_service)
    end

end
