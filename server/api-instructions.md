In /server directory:
- run "npm run reset" to reset the database to the initial state with seeding data. Details of seeding data in /server/data directory.
- run "npm run start" to reset the database and start the server
- run "npm run dev" to start the server only. The data on database isn't changed.

ClubHub API has following endpoints. The endpoints with checked are already implemented.

# Clubs
- [x] /api/clubs -> get all clubs, each club includes:
  + id
  + name
  + description
  + email
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/clubs/:clubId -> all details of club by Id including:
  + id
  + name
  + description
  + email
  + board_members: lists of board_members, each has:
    + id
    + fullname
    + introduction
    + email
  + locations: list of club office's locations, each location includes:
    + id
    + name
    + address
  + categories; list of categories, each category includes:
    + id
    + name
    + description
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date
  + events: list of events, each has:
    + id
    + name
    + start_time
    + end_time
    + description
    + capacity
    + registered
    + images: lists of images, each has:
      + id
      + name
      + url
      + taken_date

- [x] /api/clubs/category/:categoryId -> get all clubs with category Id, each club includes:
  + id
  + name
  + description
  + email
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/clubs/search/:searchName -> get first 5 clubs whose name is similar (fuzzy search) to the searchName, each club includes:
  *** This searching uses function strict_word_similarity in pg_trgm, a module determines the similarity of alphanumeric text based on trigram matching, as well as index operator classes that support fast searching for similar strings. ***
  + id
  + name
  + description
  + email
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

# Events
- [x] /api/events -> get all events, each event includes:
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/:eventId -> all details of event by Id including:
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + locations: lists of locations, each has:
    + id
    + name
    + address
  + categories: lists of categories, each has:
    + id
    + name
    + description
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date
  + clubs: lists of clubs organizing the event, each has:
    + id
    + name

- [x] /api/events/category/:categoryId -> get all events with category Id, each event includes:
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/location/:locationId -> get all events with category Id, each event includes:
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/available -> get all events with location Id, each event includes:
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/search/:searchName -> get first 5 events whose name is similar (fuzzy search) to the searchName, each event includes:
  *** This searching uses function strict_word_similarity in pg_trgm, a module determines the similarity of alphanumeric text based on trigram matching, as well as index operator classes that support fast searching for similar strings. ***
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/user/:userGithubId -> get all events registered by the user GithubId, each event has: --> Not tested yet
  + id
  + name
  + start_time
  + end_time
  + description
  + capacity
  + registered
  + images: lists of images, each has:
    + id
    + name
    + url
    + taken_date

- [x] /api/events/register/:eventId -- POST request: body includes githubId of authorized User
-> User registers the event --> Not tested yet
- [x] /api/events/register/:eventId -- DELETE request: body includes githubId of authorized User
-> User unregisters the event --> Not tested yet

# Locations
- [x] /api/locations -> get all locations with details
- [x] /api/locations/:locationId -> get details of location by Id
  + id
  + name
  + address

# Categories
- [x] /api/categories -> get all categories with details
- [x] /api/categories/:categoryId -> get details of categories by Id
  + id
  + name
  + description

# Authentication
- [x] auth/github

- [x] auth/login/success: fetch this endpoint will get user, includes:
  + id
  + github_id
  + username (github handle)
  + avatar_url (github avatar)

- [x] auth/login/fail

- [x] auth/logout: fetch this endpoint will:
  + clear cookie session
  + get:
    + status 'logout'
    + empty user {}

- [x] auth/github/callback: (not needed for front-end) used by passport
  + redirect to homepage '/' when login successfully (can modify)
  + redirect to login page '/login' when cancel login / login fail (can modify)