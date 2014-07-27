require 'spec_helper'

describe BulkTasksController, '#new' do

  it 'instantiates a new bulk task' do
    get(:new)
    expect(assigns(:bulk_task)).to be_new_record
  end

end
