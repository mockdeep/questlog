Quickies::Application.routes.draw do
  root to: 'quickies#show'

  resources :sessions, only: [:new, :create]
  delete 'sessions', to: 'sessions#destroy', as: 'session'

  resources :contexts, only: [:create]
  resources :quickies, only: [:create, :update, :destroy]
  resources :users, only: [:new, :create, :update]

  get '/what', to: 'pages#what', as: 'what'

  get '/:slug', to: 'quickies#show', as: 'context'
end
