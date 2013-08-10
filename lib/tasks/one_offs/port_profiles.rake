namespace :oneoff do

  desc 'move user data to the profile'
  task port_profiles: :environment do
    User.transaction do
      User.all.each do |user|
        FreeProfile.create!({
          user: user,
          email: user.email,
          password_digest: user.password_digest,
        })
      end
    end
  end

end
