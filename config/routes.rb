Rails.application.routes.draw do
  require_relative '../lib/html_constraint'
  require_relative '../lib/json_constraint'

  scope constraints: HtmlConstraint.new do
    root 'pages#index'

    resources :sessions, only: [:create]
    delete '/sessions' => 'sessions#destroy', as: 'session'

    resources :free_accounts, only: %i[new create]
    resources :charges, only: %i[new create]

    get '/*path', to: 'pages#index'
  end

  scope constraints: JsonConstraint.new do
    namespace :api do
      namespace :v1 do
        resources :tasks, only: :index
      end
    end

    resources :tasks, only: %i[index create update destroy]
    resources :timeframes, only: [:index]
    resources :bulk_tasks, only: [:create]
    put(:bulk_tasks, to: 'bulk_tasks#update')

    get '', to: 'tasks#show'
    get '/:slug', to: 'tasks#show'
  end

end
