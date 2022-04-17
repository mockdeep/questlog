Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  require_relative '../lib/html_constraint'
  require_relative '../lib/json_constraint'

  scope constraints: HtmlConstraint.new do
    root 'pages#index'

    resource :session, only: [:new, :create, :destroy]

    resource :bulk_task, only: [:new, :create]
    resources :free_accounts, only: [:new, :create]
    resources :charges, only: [:new, :create]
    resources :root_tasks, only: [:index]
    resources :leaf_tasks, only: [:index]
    resources :tree_tasks, only: [:index]
    resources :tags, only: [:index, :update, :edit]
    resources :tasks, only: [:index, :create, :show, :update]
    resources :timeframes, only: [:index]
    resources :alpha, only: [:index]
    resources :help, only: [:index]
    get '/what', to: 'pages#what'
    get '/privacy', to: 'pages#privacy'
    get '/:slug', to: 'tags#show'
  end

  scope constraints: JsonConstraint.new do
    namespace :api do
      namespace :v1 do
        resources :tags, only: [:create, :update]
        resources :tasks, only: [:index, :create, :update, :destroy]
      end
    end

    resources :tasks, only: [:index, :update]
    resources :timeframes, only: [:index]
    resource :bulk_task, only: [:update]

    get '(/:slug)', to: 'tasks#show'
  end
end
