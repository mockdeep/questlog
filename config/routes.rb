# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope defaults: { format: :html }, format: false do
    root "pages#index"

    resource :session, only: [:new, :create, :destroy]

    resource :bulk_task, only: [:new, :create]
    resources :free_accounts, only: [:new, :create]
    resources :charges, only: [:new, :create]
    resources :root_tasks, only: [:index]
    resources :leaf_tasks, only: [:index]
    resources :tree_tasks, only: [:index]
    resources :tags, only: [:index, :show, :edit, :update]
    resources :tasks, only: [:index, :create, :show, :update, :destroy]
    resources :timeframes, only: [:index]
    resources :alpha, only: [:index]
    resources :help, only: [:index]
    get "/what", to: "pages#what"
    get "/privacy", to: "pages#privacy"
  end
end
