### Setup Instructions
This project makes use of `nvm`
```cli
brew install nvm && nvm use
```
Install package dependencies and start the server
```cli
yarn && yarn start
```

### Testing
Since there isn't really any business logic to unit test I chose to provide E2E tests using `chai`. I began to implement mocks using `sinon` but ran out of time.
```cli
yarn test
```

## API
### GET /chatr/:recipientId
> Get all Chatr for a single user
### GET /chatr/:recipientId/from/:senderId
> Get all Chatr for a single user filtered to a single sender
### POST /chatr/:recipientId/from/:senderId
body:
```json
{
  "message": "example message"
}
```
> Create a Chatr betwee two users

### Future work
I have a vestigial `user` table that I would flesh out given more time. Simple nickserv functionality could be implemented such that users could claim a nickname and then "ghost" other folks off of their name later.

Give more time, I also wanted to allow users to search through their own sent & received messages. I was initially investigating [Redisearch](https://github.com/RediSearch/RediSearch) as a lightweight full-text document store.

### BONUS
Here is a photo of my good boy, Link, in an overt attempt to sway your opinion ![](/public/images/link.jpeg)