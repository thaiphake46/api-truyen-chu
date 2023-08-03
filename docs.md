# Initialization

- "npm run install:omit:dev": install dependencies
- config env in file ".env"
- "npm run db:migrate": migrate database
- "example_data.sql": if you want to use it, import it to mysql
- "npm start": start app

# Api endpoint:

### - auth

1. "/api/auth/refresh-token"

- Detail: Get a new access token
- Headers
  - Content-Type: application/x-www-form-urlencoded
- body
  - refreshToken

### - user

1. "/api/user/register"

- Detail: Register normal user
- Headers
  - Content-Type: application/x-www-form-urlencoded
- body:
  - username
  - email
  - password

2. "/api/user/register/author"

- Detail: Register author user
- Headers
  - Content-Type: application/x-www-form-urlencoded
- body
  - username
  - email
  - password

3. "/api/user/login"

- Detail: Login
- Headers
  - Content-Type: application/x-www-form-urlencoded
- body
  - email
  - password

4. "/api/user/profile"

- Detail: Get info user
- Headers
  - Authorization: Bearer \<token>

5. "/api/user/change-password"

- Detail: Update password for user
- Headers
  - Authorization: Bearer \<token>
- body
  - password

### - story

1. /api/story/create-a-new-story

- Detail: Create a new story
- Headers
  - Authorization: Bearer \<token>
  - multipart/form-data
- body
  - image
  - storyName

2. /api/story/patch/image-story/:storyId

- Detail: When you want edit image of a chapter
- Headers
  - Authorization: Bearer \<token>
  - Content-Type: multipart/form-data
- body
  - image

3. /api/story/patch/info-story/:storyId

- Detail: When you want edit name of a chapter
- Headers
  - Authorization: Bearer \<token>
  - Content-Type: application/x-www-form-urlencoded
- body
  - storyName

4. /api/story/delete/story/:storyId

- Detail: Delete a story
- Headers
  - Authorization: Bearer \<token>

5. /api/story/create-a-new-chapter

- Detail: Create a new chapter for story
- Headers
  - Authorization: Bearer \<token>
  - Content-Type: application/x-www-form-urlencoded
- body
  - chapterName
  - chapterContent
  - storyId

6. /api/story/patch/chapter/:storyId/:chapterId

- Detail: When you want edit a chapter
- Headers
  - Authorization: Bearer \<token>
  - Content-Type: application/x-www-form-urlencoded
- body
  - chapterName
  - chapterContent

7. /api/story/delete/chapter/:storyId/:chapterId

- Detail: Delete a chapter
- Headers
  - Authorization: Bearer \<token>

8. /api/story/getStoryPostedByAuthor

- Detail: Get all stories posted for author page
- Headers
  - Authorization: Bearer \<token>

9. /api/story/guestGetRandomListStoryName/?limit=10

- Detail: Get random stories according to parameter limit

10. /api/story/:storySlug

- Detail: Get a story detail, include author name and chapter list

11. /api/story/:storySlug/:chapterSlug

- Detail: Get a chapter detail of a story
