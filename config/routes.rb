Questlog::Application.routes.draw do
  root to: 'tasks#show'

  resources :sessions, only: [:new, :create]
  delete 'sessions', to: 'sessions#destroy', as: 'session'

  resources :tasks, only: [:index, :create, :update, :destroy]
  resources :users, only: [:update]
  resources :free_accounts, only: [:new, :create]

  get '/privacy', to: 'pages#privacy', as: 'privacy'
  get '/what', to: 'pages#what', as: 'what'

  get '/:slug', to: 'tasks#show', as: 'context'
end
