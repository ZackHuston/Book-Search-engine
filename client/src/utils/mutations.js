import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
    mutation saveBook(bookId: ID, authors: [String], description: String, title: String, image: String, link: String ) {
     saveBook(bookId: $bookID, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
      Book {
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

export const REMOVE_BOOK = gql`
mutation removeBook(bookId: ID) {
    removeBook(bookId: $bookId) {
     Book {
        bookId
     }
   }
 }
`;
