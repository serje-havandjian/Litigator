class CasesController < ApplicationController

    def index
        cases = Case.all
        render json: cases, include: "*.*", status: :ok
    end

    def show
        oneCase = Case.find(params[:id])
        render json: oneCase, status: :ok
    end

    def create
        oneCase = Case.create!(case_params)
        render json: oneCase
    end

    def update
        oneCase = Case.find(params[:id])
        oneCase.update!(case_params)
        render json: oneCase
    end

    def destroy
        oneCase = Case.find(params[:id])
        oneCase.destroy
        head 
    end

    private

    def case_params
        params.permit(:name, :counsel, :date_case_filed, :date_complaint_served)
    end

end
