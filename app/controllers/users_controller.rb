class UsersController < ApplicationController

    def show
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
        user = User.find(session[:user_id])
        render json: user, status: :ok
    end

    def create
        user = User.create(user_params)
        session[:user_id] = user.id
        if user.valid?
            render json: user, status: :created
        else
            render json: { error: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def index
        users = User.all
        render json: users, status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

end
