# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171119052925) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "intarray"
  enable_extension "hstore"

  create_table "free_accounts", force: :cascade do |t|
    t.string "email", limit: 255, null: false
    t.string "password_digest", limit: 255, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_free_accounts_on_email", unique: true
  end

  create_table "guest_accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stats", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "value", null: false
    t.datetime "timestamp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["name", "user_id", "timestamp"], name: "index_stats_on_name_and_user_id_and_timestamp", unique: true
    t.index ["name"], name: "index_stats_on_name"
    t.index ["user_id"], name: "index_stats_on_user_id"
  end

  create_table "taggings", force: :cascade do |t|
    t.integer "tag_id", null: false
    t.integer "task_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tag_id", "task_id"], name: "index_taggings_on_tag_id_and_task_id", unique: true
    t.index ["tag_id"], name: "index_taggings_on_tag_id"
    t.index ["task_id"], name: "index_taggings_on_task_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", limit: 255
    t.integer "unfinished_tasks_count", default: 0
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", limit: 255
    t.jsonb "rules", default: [], null: false
    t.index ["slug"], name: "index_tags_on_slug"
    t.index ["user_id", "unfinished_tasks_count"], name: "index_tags_on_user_id_and_unfinished_tasks_count"
    t.index ["user_id"], name: "index_tags_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.integer "user_id"
    t.string "title"
    t.datetime "done_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "repeat_string", limit: 255
    t.integer "skip_count", default: 0
    t.integer "time_estimate"
    t.integer "priority"
    t.datetime "release_at"
    t.integer "repeat_seconds"
    t.integer "estimate_seconds"
    t.integer "position", null: false
    t.string "timeframe"
    t.integer "parent_task_id"
    t.integer "energy"
    t.integer "fun"
    t.integer "importance"
    t.integer "urgency"
    t.index ["done_at"], name: "index_tasks_on_done_at"
    t.index ["parent_task_id"], name: "index_tasks_on_parent_task_id"
    t.index ["position"], name: "index_tasks_on_position"
    t.index ["priority", "position"], name: "index_tasks_on_priority_and_position"
    t.index ["priority"], name: "index_tasks_on_priority"
    t.index ["release_at"], name: "index_tasks_on_release_at"
    t.index ["timeframe"], name: "index_tasks_on_timeframe"
    t.index ["updated_at"], name: "index_tasks_on_updated_at"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", limit: 255
    t.string "password_digest", limit: 255
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "unfinished_tasks_count", default: 0
    t.integer "account_id"
    t.string "account_type", limit: 255
    t.string "customer_id", limit: 255
    t.hstore "options", default: {}, null: false
    t.index ["account_id", "account_type"], name: "index_users_on_account_id_and_account_type", unique: true
    t.index ["account_id"], name: "index_users_on_account_id"
    t.index ["account_type"], name: "index_users_on_account_type"
    t.index ["customer_id"], name: "index_users_on_customer_id"
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "stats", "users"
  add_foreign_key "taggings", "tags", name: "taggings_tag_id_fk"
  add_foreign_key "taggings", "tasks", name: "taggings_task_id_fk"
  add_foreign_key "tags", "users", name: "tags_user_id_fk"
  add_foreign_key "tasks", "tasks", column: "parent_task_id"
  add_foreign_key "tasks", "users", name: "tasks_user_id_fk"
end
