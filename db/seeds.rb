account = FreeAccount.create!(
  email: 'demo@questlog.io',
  password: 'pizzas',
  password_confirmation: 'pizzas',
)

user = User.create(account: account)

home_tag = user.tags.create(name: 'home')
work_tag = user.tags.create(name: 'work')
errand_tag = user.tags.create(name: 'errand')

user.tasks.create(title: 'feed dog', tags: [home_tag])
user.tasks.create(title: 'do work', tags: [work_tag])
user.tasks.create(title: 'buy groceries', tags: [errand_tag])
user.tasks.create(title: 'read feeds')
