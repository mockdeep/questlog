Questlog::Application.routes.draw do
  require_relative '../lib/html_constraint'
  require_relative '../lib/json_constraint'

  scope constraints: HtmlConstraint.new do
    root 'pages#index'

    resources :sessions, only: [:create]
    delete '/sessions' => 'sessions#destroy', as: 'session'

    resources :free_accounts, only: [:new, :create]
    resources :charges, only: [:new, :create]

    get '/*path', to: 'pages#index'
  end

  scope constraints: JsonConstraint.new do
    resources :tags, only: [:index]
    resources :tasks, only: [:index, :create, :update, :destroy]
    resources :timeframes, only: [:index]
    resources :bulk_tasks, only: [:create]
    put :bulk_tasks, to: 'bulk_tasks#update'

    get '', to: 'tasks#show'
    get '/untagged', to: 'untagged_tasks#show', as: :untagged
    get '/needs_estimate', to: 'needs_estimate#show'
    get '/:slug', to: 'tasks#show'
  end

end
