import gql from 'graphql-tag';

export const Get_Me = gql`
 {
     me {
         _id
         username
         email
         bookCount
         saveBooks {
             bookId
             authors
             description
             title
             image
             link
         }
     }
 }
`;
