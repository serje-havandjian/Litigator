Rails.application.routes.draw do

  mount ActionCable.server => "/cable"

  resources :milestones_if_demurrer_delays
  resources :milestones_for_answers
  resources :milestones_for_demurrers
  resources :deadlines
  resources :triggers
  resources :cases
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

    # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Route for login after signup
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Route for signing up/creating new user
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

end
