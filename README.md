# Project overview

This project is a really simplified Facebook like app

# List of endpoints

1. Register - That will accept name, email, password. This API should create a user in the DB and return a JWT token - that can then be used to make other calls.
2. Login - that will accept email and password and will return the JWT token - that can then be used to make other calls.
3. Create post - should require a JWT token and will accept the post body, Should create a post and return created post.
4. Get user - should require a JWT token and will accept the user id, should return the user entity.
5. Get posts - should require a JWT token and will respond with list of all posts.
