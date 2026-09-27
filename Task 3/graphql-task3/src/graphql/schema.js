export const typeDefs = `#graphql
  enum Role {
    USER
    ADMIN
  }

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!
  }

  type AuthPayload {
    message: String!
    token: String!
    user: User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    health: String!
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateRole(id: ID!, role: Role!): User!
  }
`;
