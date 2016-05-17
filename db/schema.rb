# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160517003354) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "intarray"
  enable_extension "hstore"

  create_table "free_accounts", force: :cascade do |t|
    t.string   "email",           limit: 255, null: false
    t.string   "password_digest", limit: 255, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "free_accounts", ["email"], name: "index_free_accounts_on_email", unique: true, using: :btree

  create_table "guest_accounts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stats", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "value",      null: false
    t.datetime "timestamp",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name",       null: false
  end

  add_index "stats", ["name", "user_id", "timestamp"], name: "index_stats_on_name_and_user_id_and_timestamp", unique: true, using: :btree
  add_index "stats", ["name"], name: "index_stats_on_name", using: :btree
  add_index "stats", ["user_id"], name: "index_stats_on_user_id", using: :btree

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "task_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["tag_id", "task_id"], name: "index_taggings_on_tag_id_and_task_id", unique: true, using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["task_id"], name: "index_taggings_on_task_id", using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "name",                   limit: 255
    t.integer  "unfinished_tasks_count",             default: 0
    t.integer  "user_id"
    t.datetime "created_at",                                     null: false
    t.datetime "updated_at",                                     null: false
    t.string   "slug",                   limit: 255
  end

  add_index "tags", ["slug"], name: "index_tags_on_slug", using: :btree
  add_index "tags", ["user_id", "unfinished_tasks_count"], name: "index_tags_on_user_id_and_unfinished_tasks_count", using: :btree
  add_index "tags", ["user_id"], name: "index_tags_on_user_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title"
    t.datetime "done_at"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "repeat_string",    limit: 255
    t.integer  "skip_count",                   default: 0
    t.integer  "time_estimate"
    t.integer  "priority"
    t.datetime "release_at"
    t.integer  "repeat_seconds"
    t.integer  "estimate_seconds"
    t.integer  "position",                                 null: false
    t.string   "timeframe"
  end

  add_index "tasks", ["done_at"], name: "index_tasks_on_done_at", using: :btree
  add_index "tasks", ["position"], name: "index_tasks_on_position", using: :btree
  add_index "tasks", ["priority", "position"], name: "index_tasks_on_priority_and_position", using: :btree
  add_index "tasks", ["priority"], name: "index_tasks_on_priority", using: :btree
  add_index "tasks", ["release_at"], name: "index_tasks_on_release_at", using: :btree
  add_index "tasks", ["timeframe"], name: "index_tasks_on_timeframe", using: :btree
  add_index "tasks", ["updated_at"], name: "index_tasks_on_updated_at", using: :btree
  add_index "tasks", ["user_id"], name: "index_tasks_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255
    t.string   "password_digest",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.integer  "unfinished_tasks_count",             default: 0
    t.integer  "account_id"
    t.string   "account_type",           limit: 255
    t.string   "customer_id",            limit: 255
    t.hstore   "options",                            default: {}, null: false
  end

  add_index "users", ["account_id", "account_type"], name: "index_users_on_account_id_and_account_type", unique: true, using: :btree
  add_index "users", ["account_id"], name: "index_users_on_account_id", using: :btree
  add_index "users", ["account_type"], name: "index_users_on_account_type", using: :btree
  add_index "users", ["customer_id"], name: "index_users_on_customer_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", using: :btree

  add_foreign_key "stats", "users"
  add_foreign_key "taggings", "tags", name: "taggings_tag_id_fk"
  add_foreign_key "taggings", "tasks", name: "taggings_task_id_fk"
  add_foreign_key "tags", "users", name: "tags_user_id_fk"
  add_foreign_key "tasks", "users", name: "tasks_user_id_fk"
end
