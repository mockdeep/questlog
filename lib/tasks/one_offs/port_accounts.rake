namespace :oneoff do

  desc 'move user data to the profile'
  task port_accounts: :environment do
    User.transaction do
      User.all.each do |user|
        account = FreeAccount.create!({
          email: user.email,
          password_digest: user.password_digest,
        })
        user.update_attributes!(account: account)
      end
    end
  end

end
