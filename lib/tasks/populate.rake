namespace :db do
  desc 'populate database records for development'
  task populate: :environment do
    fail 'Bad! Not to be used in production!' if Rails.env.production?
    User.delete_all
    FreeAccount.delete_all
    account = FreeAccount.create!(
      email: 'lobatifricha@gmail.com',
      password: 'pizzas',
      password_confirmation: 'pizzas',
    )
    User.create!(account: account)
  end
end
