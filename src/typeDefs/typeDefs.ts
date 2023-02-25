const { gql } = require("apollo-server");

module.exports = gql`
  type ContentBlock {
    contentBlockID: ID!
    name: String
    type: String
    content: String
    orderNumber: Int
    createdAt: String
    updatedAt: String
  }

  input ContentBlockInput {
    name: String
    type: String
    content: String
    orderNumber: Int
  }

  type Query {
    getContentBlockById(contentBlockID: ID!): ContentBlock!
    getContentBlocks: [ContentBlock!]!
    getContentBlocksByType(contentBlockType: String!): [ContentBlock!]!
  }

  type Mutation {
    createContentBlock(contentBlockInput: ContentBlockInput): ContentBlock!
    updateContentBlock(
      contentBlockID: ID!
      contentBlockInput: ContentBlockInput
    ): ContentBlock!
    deleteContentBlock(contentBlockID: ID!): String!
  }
`;
