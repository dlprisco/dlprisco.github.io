# frozen_string_literal: true

source "https://rubygems.org"

# gem "rails"
source 'https://rubygems.org'

gem "jekyll-sass-converter"
gem "jekyll"
gem "jekyll-theme-hacker"

gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "jekyll-feed"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo"
  gem "tzinfo-data"
end

gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]
gem "webrick"