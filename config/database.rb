# encoding: utf-8
DataMapper::Logger.new($stdout, :debug)
DataMapper::Model.raise_on_save_failure = true
DataMapper.setup(:default, "sqlite://#{__dir__}/database.sqlite3")

require 'app/models/user'

DataMapper.finalize
DataMapper.auto_upgrade!
