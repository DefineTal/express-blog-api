# blog-api

## Models to make

### Blog

- Title
- Content
- User (posted by)
- Created date
- Like
- Image upload
- Category
- Tags/keywords
- Audit history
    - user
    - timestamp



### Users

- username
- blog post view history

### Comments
Join table in SQl, but subdocument in Mongoose that lives in Blog posts
- user id
- comment content
- like

### Action log (TBD)

- user id
- route visited
- timestamp
- result