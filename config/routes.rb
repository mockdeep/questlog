Questlog::Application.routes.draw do
  root 'tasks#show'

  resources :sessions, only: [:new, :create]
  delete '/sessions' => 'sessions#destroy', as: 'session'

  resources :tasks, only: [:index, :create, :update, :destroy]
  resources :bulk_tasks, only: [:new, :create]
  resources :free_accounts, only: [:new, :create]

  get '/privacy' => 'pages#privacy', as: :privacy
  get '/what' => 'pages#what', as: :what

  get '/:slug' => 'tasks#show', as: :context
end
