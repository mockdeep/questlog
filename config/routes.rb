Questlog::Application.routes.draw do
  root 'tasks#show'

  resources :sessions, only: [:new, :create]
  delete '/sessions' => 'sessions#destroy', as: 'session'

  resources :tags, only: [:index]
  resources :tasks, only: [:index, :create, :update, :destroy]
  resources :bulk_tasks, only: [:new, :create]
  resources :free_accounts, only: [:new, :create]
  resources :charges, only: [:new, :create]

  get '/privacy' => 'pages#privacy', as: :privacy
  get '/what' => 'pages#what', as: :what
  get '/untagged', to: 'untagged_tasks#show', as: :untagged

  get '/:slug' => 'tasks#show', as: :tag
end
