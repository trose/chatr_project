```
 ________   ___  ___   ________   _________   ________     
|\   ____\ |\  \|\  \ |\   __  \ |\___   ___\|\   __  \    
\ \  \___| \ \  \\\  \\ \  \|\  \\|___ \  \_|\ \  \|\  \   
 \ \  \     \ \   __  \\ \   __  \    \ \  \  \ \   _  _\  
  \ \  \____ \ \  \ \  \\ \  \ \  \    \ \  \  \ \  \\  \| 
   \ \_______\\ \__\ \__\\ \__\ \__\    \ \__\  \ \__\\ _\ 
    \|_______| \|__|\|__| \|__|\|__|     \|__|   \|__|\|__|
```
a simple chat API built in Node
## Setup Instructions

This project makes use of `nvm`
```
brew install nvm && nvm use
```
Install package dependencies and start the server
```
yarn &&
node ./scripts/createTables.js &&
yarn start
```

## Testing
Since there isn't really any business logic to unit test I chose to provide E2E tests using `chai`. I began to implement mocks using `sinon` but ran out of time.

Start the server in one tab and in another:
```
yarn test
```

## API

### GET /chatr/:recipientId
> Get all Chatr for a single user

example: `curl --request GET 'localhost:3000/chatr/12345'`
```json
{
  "chatr": [
    {
      "id": 1,
      "recipientId": 12345,
      "senderId": 6789,
      "message": "test message",
      "createdAt": "2022-05-05 00:24:57"
    }
  ]
}
```
### GET /chatr/:recipientId/from/:senderId
> Get all Chatr for a single user filtered to a single sender

example: `curl --request GET 'localhost:3000/chatr/12345/from/6789'`
```json
{
  "chatr": [
    {
      "id": 1,
      "recipientId": 12345,
      "senderId": 6789,
      "message": "test message",
      "createdAt": "2022-05-05 00:24:57"
    }
  ]
}
```

### POST /chatr/:recipientId/from/:senderId
body:
```json
{
  "message": "example message"
}
```
> Create a Chatr between two users

example: `curl --request POST 'localhost:3000/chatr/12345/from/6789' \
--header 'Content-Type: application/json' \
--data-raw '{
    "message": "Test message"
}'`

### Future work
Right now, users would have to know eachother's ids or the UI would have to keep a mapping of username to id. I have a vestigial `user` table that I would flesh out given more time. Simple nickserv functionality could be implemented such that users could claim a nickname and then "ghost" other folks off of their name later by adding a few columns to `user`.

Given more time, I also wanted to allow users to search through their own sent & received messages. I was initially investigating [Redisearch](https://github.com/RediSearch/RediSearch) as a lightweight full-text document store. This is a common feature in most chat apps so I think users would expect it. 

### BONUS
Here is a photo of my good boy, Link, in an overt attempt to sway your opinion 🤠

 ![](/public/images/link.jpeg)