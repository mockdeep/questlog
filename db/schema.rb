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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140716035150) do

  create_table "contexts", :force => true do |t|
    t.string   "name"
    t.integer  "tasks_count", :default => 0
    t.integer  "user_id"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
    t.string   "slug"
  end

  add_index "contexts", ["slug"], :name => "index_contexts_on_slug"
  add_index "contexts", ["user_id"], :name => "index_contexts_on_user_id"

  create_table "free_accounts", :force => true do |t|
    t.string   "email",           :null => false
    t.string   "password_digest", :null => false
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "free_accounts", ["email"], :name => "index_free_accounts_on_email", :unique => true

  create_table "guest_accounts", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "taggings", :force => true do |t|
    t.integer  "context_id"
    t.integer  "task_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "taggings", ["context_id", "task_id"], :name => "index_taggings_on_context_id_and_task_id", :unique => true
  add_index "taggings", ["context_id"], :name => "index_taggings_on_context_id"
  add_index "taggings", ["task_id"], :name => "index_taggings_on_task_id"

  create_table "tasks", :force => true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.datetime "done_at"
    t.datetime "created_at",                         :null => false
    t.datetime "updated_at",                         :null => false
    t.string   "repeat_string"
    t.integer  "skip_count",       :default => 0
    t.integer  "time_estimate"
    t.integer  "priority"
    t.datetime "release_at"
    t.integer  "repeat_seconds"
    t.integer  "estimate_seconds"
    t.boolean  "visible",          :default => true, :null => false
  end

  add_index "tasks", ["done_at"], :name => "index_tasks_on_done_at"
  add_index "tasks", ["priority"], :name => "index_tasks_on_priority"
  add_index "tasks", ["release_at"], :name => "index_tasks_on_release_at"
  add_index "tasks", ["updated_at"], :name => "index_tasks_on_updated_at"
  add_index "tasks", ["user_id", "visible"], :name => "index_tasks_on_user_id_and_visible"
  add_index "tasks", ["user_id"], :name => "index_tasks_on_user_id"
  add_index "tasks", ["visible"], :name => "index_tasks_on_visible"

  create_table "users", :force => true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.integer  "tasks_count",     :default => 0
    t.string   "mode",            :default => "simple"
    t.integer  "account_id"
    t.string   "account_type"
  end

  add_index "users", ["account_id", "account_type"], :name => "index_users_on_account_id_and_account_type", :unique => true
  add_index "users", ["account_id"], :name => "index_users_on_account_id"
  add_index "users", ["account_type"], :name => "index_users_on_account_type"
  add_index "users", ["email"], :name => "index_users_on_email"

end
