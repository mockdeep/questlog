namespace :db do
  desc "populate database records for development"
  task :populate => :environment do
    raise "Bad! Not to be used in production!" if Rails.env.production?
    User.delete_all
    User.create!({
      email: 'lobatifricha@gmail.com',
      password: 'pizzas',
      password_confirmation: 'pizzas'
    })
  end
end
