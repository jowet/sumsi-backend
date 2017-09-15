Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :ledgers, only: [:index, :show] do
      resources :tasks, only: [:index, :show, :create, :update]
    end
  end
end
