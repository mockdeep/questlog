Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  require_relative '../lib/html_constraint'
  require_relative '../lib/json_constraint'

  scope constraints: HtmlConstraint.new do
    root 'pages#index'

    resource :session, only: %i[create destroy]

    resources :free_accounts, only: %i[new create]
    resources :charges, only: %i[new create]

    get '/*path', to: 'pages#index'
  end

  scope constraints: JsonConstraint.new do
    namespace :api do
      namespace :v1 do
        resources :tags, only: %i[create update]
        resources :tasks, only: %i[index create update destroy]
      end
    end

    resources :tasks, only: %i[index update]
    resources :timeframes, only: [:index]
    resource :bulk_task, only: %i[create update]

    get '(/:slug)', to: 'tasks#show'
  end
end
