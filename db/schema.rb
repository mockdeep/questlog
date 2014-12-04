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

ActiveRecord::Schema.define(version: 20141204153023) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "free_accounts", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "free_accounts", ["email"], name: "index_free_accounts_on_email", unique: true, using: :btree

  create_table "guest_accounts", force: true do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "taggings", force: true do |t|
    t.integer  "tag_id",     null: false
    t.integer  "task_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["tag_id", "task_id"], name: "index_taggings_on_tag_id_and_task_id", unique: true, using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["task_id"], name: "index_taggings_on_task_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name"
    t.integer  "unfinished_tasks_count", default: 0
    t.integer  "user_id"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "slug"
  end

  add_index "tags", ["slug"], name: "index_tags_on_slug", using: :btree
  add_index "tags", ["user_id", "unfinished_tasks_count"], name: "index_tags_on_user_id_and_unfinished_tasks_count", using: :btree
  add_index "tags", ["user_id"], name: "index_tags_on_user_id", using: :btree

  create_table "tasks", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.datetime "done_at"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "repeat_string"
    t.integer  "skip_count",       default: 0
    t.integer  "time_estimate"
    t.integer  "priority"
    t.datetime "release_at"
    t.integer  "repeat_seconds"
    t.integer  "estimate_seconds"
  end

  add_index "tasks", ["done_at"], name: "index_tasks_on_done_at", using: :btree
  add_index "tasks", ["priority"], name: "index_tasks_on_priority", using: :btree
  add_index "tasks", ["release_at"], name: "index_tasks_on_release_at", using: :btree
  add_index "tasks", ["updated_at"], name: "index_tasks_on_updated_at", using: :btree
  add_index "tasks", ["user_id"], name: "index_tasks_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "unfinished_tasks_count", default: 0
    t.integer  "account_id"
    t.string   "account_type"
    t.string   "customer_id"
  end

  add_index "users", ["account_id", "account_type"], name: "index_users_on_account_id_and_account_type", unique: true, using: :btree
  add_index "users", ["account_id"], name: "index_users_on_account_id", using: :btree
  add_index "users", ["account_type"], name: "index_users_on_account_type", using: :btree
  add_index "users", ["customer_id"], name: "index_users_on_customer_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", using: :btree

  add_foreign_key "taggings", "tags", name: "taggings_tag_id_fk"
  add_foreign_key "taggings", "tasks", name: "taggings_task_id_fk"

  add_foreign_key "tags", "users", name: "tags_user_id_fk"

  add_foreign_key "tasks", "users", name: "tasks_user_id_fk"

end
