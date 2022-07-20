class CasesController < ApplicationController

    def index
        cases = Case.all
        render json: cases
    end

end
