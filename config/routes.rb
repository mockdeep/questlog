Quickies::Application.routes.draw do
  root to: 'quickies#show'
  resources :sessions, only: [:new, :create]
  delete 'sessions', to: 'sessions#destroy', as: 'session'
  resources :users, only: [:new, :create]
  resources :quickies, only: [:create, :update]
end
