# Task 3 - GraphQL API Development

A GraphQL API built with Apollo Server, Express, SQLite and JWT authentication.

## Features

- GraphQL queries and mutations
- Apollo Server 4 + Express
- JWT authentication
- Role-based authorization (`USER` / `ADMIN`)
- SQLite database; no MongoDB required
- Password hashing with bcryptjs
- DataLoader-style batching for efficient repeated user lookups
- Helmet, compression, CORS and Morgan

## Folder structure

```text
graphql-task3/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── graphql/
│   │   ├── schema.js
│   │   └── resolvers.js
│   ├── loaders/
│   │   └── userLoader.js
│   ├── models/
│   │   └── User.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Run in PowerShell

```powershell
cd C:\Users\poornima\Downloads\graphql-task3
npm install
copy .env.example .env
npm run dev
```

Open:

- http://localhost:5000/
- http://localhost:5000/api/health
- http://localhost:5000/graphql

## Register

```graphql
mutation {
  register(input: {
    name: "Poornima"
    email: "poornima@example.com"
    password: "password123"
  }) {
    message
    token
    user {
      id
      name
      email
      role
    }
  }
}
```

Copy the returned token.

## Login

```graphql
mutation {
  login(input: {
    email: "poornima@example.com"
    password: "password123"
  }) {
    message
    token
    user {
      id
      name
      email
      role
    }
  }
}
```

## Authenticated query

In Apollo Sandbox, add this HTTP header:

```json
{
  "Authorization": "Bearer YOUR_TOKEN_HERE"
}
```

Then run:

```graphql
query {
  me {
    id
    name
    email
    role
  }
}
```

## Admin query

Only an admin can run:

```graphql
query {
  users {
    id
    name
    email
    role
    createdAt
  }
}
```

## Update a role

Only an admin can run:

```graphql
mutation {
  updateRole(id: "2", role: ADMIN) {
    id
    name
    email
    role
  }
}
```

The API prevents an administrator from changing their own role.

## GraphQL best practices demonstrated

1. Clients request only the fields they need, reducing over-fetching.
2. Authentication is handled once in GraphQL context and checked by resolvers.
3. SQL uses parameterized queries.
4. `UserModel.findByIds()` batches multiple ID lookups into one SQL query.
5. Passwords are never returned by the GraphQL schema.
6. SQLite WAL mode improves concurrent read behavior.
