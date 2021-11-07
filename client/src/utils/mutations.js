import gql from 'graphql-tag';

export const Login_User = gql`
   mutation login ($email: String!, $password: String!) {
       login(email: $email, password: $password) {
           token
           user {
               _id
               username
           }
       }
   }
`;

export const Add_User = gql`
   mutation addUser ($username: String!, $email: String!, $password: String!) {
       addUser(username: $username, email: $email, password: $password) {
           token
           user {
               _id
               username
           }
       }
   }
`;

export const Save_Book = gql`
  mutation saveBook ($authors: [String],$description: String,$title: String,$bookId: String, $image: String,$link:String) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, link: $link){
        _id
        username
        savedBooks{
            authors
            description
            title
            bookId
            image
            link
        }
    }
  }
`;

export const Remove_Book = gql`
mutation removeBook($bookId:String!){
    removeBook(bookId: $bookId){
        username
        savedBooks{
            authors
            description
            title
            bookId
            image
            link
        }
    }
}
`;
   