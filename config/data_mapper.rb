# encoding: utf-8
DataMapper::Logger.new($stdout, :debug)

DataMapper.setup(:default, 'sqlite::memory:')
