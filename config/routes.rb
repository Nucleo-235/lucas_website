Rails.application.routes.draw do

  resources :projects
  resources :project_contents

  scope "(:locale)", locale: /pt-BR|en|es/ do
    root to: 'pages#home'
  end
  devise_for :users

end
