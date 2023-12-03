# Project_278
IMDB clone; 
responsive website that includes:
    -signing in and signing up with forgot password options
    -log in using IMDB account, google, or facebook
    -a user profile showing picture, name, date of birth, date when they first joined the website, ratings, top picks, reviews, username, gender, country
    A homepage:
        -Featured today
        -coming soon
        -US box office
    
# ENV
MONGODB_URL= 
TOKEN_SECRET= 
TMDB_BASE_URL= 
TMDB_KEY= 

# dependencies
yarn install

# you need to launch both the server and the client 
# how to launch the server
cd server
yarn start

# how to launch the client
cd client
yarn start
