# GH Client

A Github CLI client written in TypeScript and GraphQL.

## Show your token

```bash
node -e "require('dotenv').config(); require('keytar').getPassword('github', process.env.CLIENT_ID).then(console.log)"
```

## Generate schema

```bash
npm run apollo schema:download --header="Authorization: Bearer <token>" --endpoint=https://api.github.com/graphql graphql-schema.json
```

## Dependencies

- [react-blessed](https://github.com/Yomguithereal/react-blessed)
- [@apollo/client](https://github.com/apollographql/apollo-client)
- [Open](https://github.com/sindresorhus/open)
