
# ADC : Andela Development Challenge

# MyDiary
[![Build Status](https://travis-ci.org/Pacifique78/MyDiary.svg?branch=develop)](https://travis-ci.org/Pacifique78/MyDiary)
[![Coverage Status](https://coveralls.io/repos/github/Pacifique78/MyDiary/badge.svg?branch=develop)](https://coveralls.io/github/Pacifique78/MyDiary?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/8c496ca082e2128511bd/maintainability)](https://codeclimate.com/github/Pacifique78/MyDiary/maintainability)

#MyDiary is an online journal where users can pen down their thoughts and feelings.
## Features
* Users can sign up
* Users can sign in
* Users can view all entries to their diary
* Users can view all the content of the diary entry
* Users can add an entry
* Users can modify an entry
* User can delete an entry
## Pivotal Tracker stories
* PT board link: (https://www.pivotaltracker.com/n/projects/2400721)
## UI Template
* use this link to access the UI templates  https://pacifique78.github.io/MyDiary/UI/
## Heroku link 
* use this link to access heroku: https://my-diary-heroku.herokuapp.com/
## Swagger Documantation
* Link: https://my-diary-heroku.herokuapp.com/api/swagger/
## Installation(Tools)
* Text Editor: Visual Code Studio
* Node/Express
* Postman
* Postgres
## SetUp Project to get Started
* Clone this repo
* install all dependencies using 
    :npm install
* Start Server
    :npm run dev
* Run Postman to check API Endpoints on
    :localhost:4000
* Test
    :npm test
## Methods and paths to test API Endpoints
| Method      | Path                                                           | Description                          |
|-------------|----------------------------------------------------------------|--------------------------------------|
| POST        | /api/v1/auth/signup                                            | Create User Account                  |
| POST        | /api/v1/auth/signin                                            | User login                           |
| POST        | /api/v1/entries                                                | Add an entry                         |
| PATCH       | /api/v1/entries/entryId                                        | Modify an entry                      |
| DELETE      | /api/v1/entries/entryId                                        | Delete an entry                      |
| GET         | /api/v1/entries                                                | View all entries                     |
| GET         | /api/v1/entries/entryId                                        | View a specific entry                |
| POST        | /api/v2/auth/signup                                            | Create User Account                  |
| POST        | /api/v2/auth/signin                                            | User login                           |
| PATCH       | /api/v2/auth/reminder                                          | change notification settings         |
| POST        | /api/v2/entries                                                | Add an entry                         |
| PATCH       | /api/v2/entries/entryId                                        | Modify an entry                      |
| DELETE      | /api/v2/entries/entryId                                        | Delete an entry                      |
| GET         | /api/v2/entries                                                | View all entries                     |
| GET         | /api/v2/entries/entryId                                        | View a specific entry                |
## Technologies Used
### Bank-End
* Node / Express js
* Express
* Joi
* Travis CI
* Code Coveralls
* Postgres
### Front-End
* HTML
* CSS
* JavaScript

### Prepared by Pacifique TUYIZERE     copyright©2019 All Right Reserved
