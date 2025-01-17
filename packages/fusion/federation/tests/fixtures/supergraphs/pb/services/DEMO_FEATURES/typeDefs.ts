export const typeDefs = /* GraphQL */ `
  type DemoAuthInfo {
    role: String!
    spaceId: ID!
    userId: ID!
  }

  input DemoCreateAndLinkInput {
    description: String
    name: String!
    noteId: ID!
  }

  union DemoCreateAndLinkPayload = DemoCreateAndLinkSuccess

  type DemoCreateAndLinkSuccess {
    feature: DemoFeature!
  }

  input DemoCreateFeatureInput {
    description: String
    name: String!
  }

  union DemoCreateFeaturePayload = DemoCreateFeatureSuccess

  type DemoCreateFeatureSuccess {
    feature: DemoFeature!
  }

  input DemoDeleteFeatureInput {
    id: ID!
  }

  union DemoDeleteFeaturePayload = DemoDeleteFeatureSuccess

  type DemoDeleteFeatureSuccess {
    feature: DemoFeature!
  }

  type DemoFeature implements Node @key(fields: "id") {
    description: String
    id: ID!
    name: String! @tag(name: "public")
    publicId: ID
  }

  type DemoFeatureAlreadyHasPublicIdError implements Error {
    message: String!
  }

  type DemoFeatureAlreadyPrivateError implements Error {
    message: String!
  }

  type DemoFeatureConnection {
    edges: [DemoFeatureEdge] @tag(name: "public")
    pageInfo: PageInfo!
  }

  type DemoFeatureEdge {
    cursor: String!
    node: DemoFeature @tag(name: "public")
  }

  input DemoFeatureFilter {
    ids: [ID!]
  }

  type DemoFeatureHasNoPublicIdError implements Error {
    message: String!
  }

  type DemoFeatureNotPublicError implements Error {
    message: String! @tag(name: "public")
  }

  input DemoMakeFeaturePrivateInput {
    id: ID!
  }

  union DemoMakeFeaturePrivatePayload =
    | DemoFeatureAlreadyPrivateError
    | DemoMakeFeaturePrivateSuccess

  type DemoMakeFeaturePrivateSuccess {
    feature: DemoFeature!
  }

  input DemoMakeFeaturePublicInput {
    id: ID!
  }

  union DemoMakeFeaturePublicPayload =
    | DemoFeatureAlreadyHasPublicIdError
    | DemoMakeFeaturePublicSuccess

  type DemoMakeFeaturePublicSuccess {
    feature: DemoFeature!
  }

  union DemoPublicFeaturePayload = DemoFeatureNotPublicError | DemoPublicFeatureSuccess

  type DemoPublicFeatureSuccess {
    feature: DemoFeature! @tag(name: "public")
  }

  input DemoRegenFeaturePublicIdInput {
    id: ID!
  }

  union DemoRegenFeaturePublicIdPayload =
    | DemoFeatureHasNoPublicIdError
    | DemoRegenFeaturePublicIdSuccess

  type DemoRegenFeaturePublicIdSuccess {
    feature: DemoFeature!
  }

  input DemoUpdateFeatureInput {
    description: String
    id: ID!
    name: String!
  }

  union DemoUpdateFeaturePayload = DemoUpdateFeatureSuccess

  type DemoUpdateFeatureSuccess {
    feature: DemoFeature!
  }

  interface Error {
    message: String!
  }

  type Mutation {
    """
    This is a distributed mutation, does something in two services
    The communication between the services is in Kafka
    """
    demoCreateAndLink(input: DemoCreateAndLinkInput!): DemoCreateAndLinkPayload!

    demoCreateFeature(input: DemoCreateFeatureInput!): DemoCreateFeaturePayload!

    demoDeleteFeature(input: DemoDeleteFeatureInput!): DemoDeleteFeaturePayload!

    """
    Provides the ability to delete the public ID of a feature that was previously made public
    """
    demoMakeFeaturePrivate(input: DemoMakeFeaturePrivateInput!): DemoMakeFeaturePrivatePayload!

    """
    Takes a feature ID that has no public ID yet and generates one for it
    Returns the generated public ID of the feature
    """
    demoMakeFeaturePublic(input: DemoMakeFeaturePublicInput!): DemoMakeFeaturePublicPayload!

    """
    Provides the ability to change the public ID of a feature that was previously made public
    """
    demoRegenFeaturePublicId(
      input: DemoRegenFeaturePublicIdInput!
    ): DemoRegenFeaturePublicIdPayload!

    demoUpdateFeature(input: DemoUpdateFeatureInput!): DemoUpdateFeaturePayload!
  }

  interface Node {
    id: ID!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  type Query {
    """
    Returns a feature based on its public id
    """
    demoFeaturePublic(publicId: ID!): DemoPublicFeaturePayload! @tag(name: "public")

    """
    Returns all the features to users with any roles
    """
    demoFeatures(
      after: String
      before: String
      filter: DemoFeatureFilter
      first: Int
      last: Int
    ): DemoFeatureConnection!
    """
    Returns all the features only to users with admin role
    """
    demoFeaturesAdmin(
      after: String
      before: String
      filter: DemoFeatureFilter
      first: Int
      last: Int
    ): DemoFeatureConnection!

    """
    Returns all the features only to users with maker or admin role
    """
    demoFeaturesMakerAndAdmin(
      after: String
      before: String
      filter: DemoFeatureFilter
      first: Int
      last: Int
    ): DemoFeatureConnection!
    demoMe: DemoAuthInfo!
  }
`;
