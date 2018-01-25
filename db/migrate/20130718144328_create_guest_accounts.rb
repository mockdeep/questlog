class CreateGuestAccounts < ActiveRecord::Migration

  def change
    # rubocop:disable Rails/CreateTableWithTimestamps
    create_table(:guest_accounts, &:timestamps)
    # rubocop:enable Rails/CreateTableWithTimestamps
  end

end
