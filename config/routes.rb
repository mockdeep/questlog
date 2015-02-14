Questlog::Application.routes.draw do
  require_relative '../lib/html_constraint'
  require_relative '../lib/json_constraint'

  scope constraints: HtmlConstraint.new do
    root 'pages#index'

    resources :sessions, only: [:new, :create]
    delete '/sessions' => 'sessions#destroy', as: 'session'

    resources :bulk_tasks, only: [:new, :create]
    resources :free_accounts, only: [:new, :create]
    resources :charges, only: [:new, :create]
    resources :tasks, only: [:index]

    get '/privacy' => 'pages#privacy', as: :privacy
    get '/what' => 'pages#what', as: :what

  end

  scope constraints: JsonConstraint.new do
    resources :tags, only: [:index]
    resources :tasks, only: [:index, :create, :update, :destroy]

    get '', to: 'tasks#show'
    get '/untagged', to: 'untagged_tasks#show', as: :untagged
    get '/:slug', to: 'tasks#show'
  end

  get '/*path', to: 'pages#index', constraints: { format: /html/ }

end
