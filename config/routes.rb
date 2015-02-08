Questlog::Application.routes.draw do
  require_relative '../lib/json_constraint'

  root 'pages#index', constraints: { format: /html/ }

  resources :sessions, only: [:new, :create]
  delete '/sessions' => 'sessions#destroy', as: 'session'

  resources :tags, only: [:index]
  resources :tasks, only: [:index, :create, :update, :destroy]
  resources :bulk_tasks, only: [:new, :create]
  resources :free_accounts, only: [:new, :create]
  resources :charges, only: [:new, :create]

  get '/privacy' => 'pages#privacy', as: :privacy
  get '/what' => 'pages#what', as: :what

  scope constraints: JsonConstraint.new do
    get '', to: 'tasks#show'
    get '/untagged', to: 'untagged_tasks#show', as: :untagged
    get '/:slug', to: 'tasks#show'
  end

  get '/*path', to: 'pages#index'
end
