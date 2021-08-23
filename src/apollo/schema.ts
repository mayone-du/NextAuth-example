import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type CategoryNode = Node & {
  __typename?: 'CategoryNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  categoryName: Scalars['String'];
  selectCategory: NewsNodeConnection;
};


export type CategoryNodeSelectCategoryArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};

export type CategoryNodeConnection = {
  __typename?: 'CategoryNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<CategoryNodeEdge>>;
};

/** A Relay edge containing a `CategoryNode` and its cursor. */
export type CategoryNodeEdge = {
  __typename?: 'CategoryNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<CategoryNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type CreateCategoryMutationInput = {
  categoryName: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateCategoryMutationPayload = {
  __typename?: 'CreateCategoryMutationPayload';
  category?: Maybe<CategoryNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateNewsMutationInput = {
  selectCategoryId?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
  tagIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contributorName?: Maybe<Scalars['String']>;
  createdAt: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateNewsMutationPayload = {
  __typename?: 'CreateNewsMutationPayload';
  news?: Maybe<NewsNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTagMutationInput = {
  tagName: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateTagMutationPayload = {
  __typename?: 'CreateTagMutationPayload';
  tag?: Maybe<TagNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserMutationInput = {
  username?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateUserMutationPayload = {
  __typename?: 'CreateUserMutationPayload';
  user?: Maybe<UserNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};



export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<CreateUserMutationPayload>;
  createCategory?: Maybe<CreateCategoryMutationPayload>;
  createTag?: Maybe<CreateTagMutationPayload>;
  createNews?: Maybe<CreateNewsMutationPayload>;
  updateNews?: Maybe<UpdateNewsMutationPayload>;
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  refreshToken?: Maybe<Refresh>;
  revokeToken?: Maybe<Revoke>;
};


export type MutationCreateUserArgs = {
  input: CreateUserMutationInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryMutationInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagMutationInput;
};


export type MutationCreateNewsArgs = {
  input: CreateNewsMutationInput;
};


export type MutationUpdateNewsArgs = {
  input: UpdateNewsMutationInput;
};


export type MutationTokenAuthArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};


export type MutationRevokeTokenArgs = {
  refreshToken?: Maybe<Scalars['String']>;
};

export type NewsNode = Node & {
  __typename?: 'NewsNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  selectCategory?: Maybe<CategoryNode>;
  url: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  imagePath?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  tags: TagNodeConnection;
  contributorName?: Maybe<Scalars['String']>;
};


export type NewsNodeTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  tagName?: Maybe<Scalars['String']>;
  tagName_Icontains?: Maybe<Scalars['String']>;
};

export type NewsNodeConnection = {
  __typename?: 'NewsNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<NewsNodeEdge>>;
};

/** A Relay edge containing a `NewsNode` and its cursor. */
export type NewsNodeEdge = {
  __typename?: 'NewsNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<NewsNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserNode>;
  allUsers?: Maybe<UserNodeConnection>;
  category?: Maybe<CategoryNode>;
  allCategories?: Maybe<CategoryNodeConnection>;
  tag?: Maybe<TagNode>;
  allTags?: Maybe<TagNodeConnection>;
  news?: Maybe<NewsNode>;
  allNews?: Maybe<NewsNodeConnection>;
  todayNews?: Maybe<NewsNodeConnection>;
  yesterdayNews?: Maybe<NewsNodeConnection>;
  specificDayNews?: Maybe<NewsNodeConnection>;
  newsCount?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryAllUsersArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  email_Icontains?: Maybe<Scalars['String']>;
  isStaff?: Maybe<Scalars['Boolean']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
};


export type QueryAllCategoriesArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  categoryName?: Maybe<Scalars['String']>;
  categoryName_Icontains?: Maybe<Scalars['String']>;
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};


export type QueryAllTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  tagName?: Maybe<Scalars['String']>;
  tagName_Icontains?: Maybe<Scalars['String']>;
};


export type QueryNewsArgs = {
  id: Scalars['ID'];
};


export type QueryAllNewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};


export type QueryTodayNewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};


export type QueryYesterdayNewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};


export type QuerySpecificDayNewsArgs = {
  year: Scalars['Int'];
  month: Scalars['Int'];
  day: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};

export type Refresh = {
  __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Revoke = {
  __typename?: 'Revoke';
  revoked: Scalars['Int'];
};

export type TagNode = Node & {
  __typename?: 'TagNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  tagName: Scalars['String'];
  tags: NewsNodeConnection;
};


export type TagNodeTagsArgs = {
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  title_Icontains?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  summary_Icontains?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  createdAt_Icontains?: Maybe<Scalars['DateTime']>;
};

export type TagNodeConnection = {
  __typename?: 'TagNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<TagNodeEdge>>;
};

/** A Relay edge containing a `TagNode` and its cursor. */
export type TagNodeEdge = {
  __typename?: 'TagNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<TagNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type UpdateNewsMutationInput = {
  id: Scalars['ID'];
  createdAt: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateNewsMutationPayload = {
  __typename?: 'UpdateNewsMutationPayload';
  news?: Maybe<NewsNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  /** The ID of the object. */
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** 全ての権限を持っているとみなされます。 */
  isSuperuser: Scalars['Boolean'];
  email: Scalars['String'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserNodeConnection = {
  __typename?: 'UserNodeConnection';
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserNodeEdge>>;
};

/** A Relay edge containing a `UserNode` and its cursor. */
export type UserNodeEdge = {
  __typename?: 'UserNodeEdge';
  /** The item at the end of the edge */
  node?: Maybe<UserNode>;
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};

export type GetNewsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNewsCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'newsCount'>
);


export const GetNewsCountDocument = gql`
    query GetNewsCount {
  newsCount
}
    `;

/**
 * __useGetNewsCountQuery__
 *
 * To run a query within a React component, call `useGetNewsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNewsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetNewsCountQuery, GetNewsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewsCountQuery, GetNewsCountQueryVariables>(GetNewsCountDocument, options);
      }
export function useGetNewsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewsCountQuery, GetNewsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewsCountQuery, GetNewsCountQueryVariables>(GetNewsCountDocument, options);
        }
export type GetNewsCountQueryHookResult = ReturnType<typeof useGetNewsCountQuery>;
export type GetNewsCountLazyQueryHookResult = ReturnType<typeof useGetNewsCountLazyQuery>;
export type GetNewsCountQueryResult = Apollo.QueryResult<GetNewsCountQuery, GetNewsCountQueryVariables>;