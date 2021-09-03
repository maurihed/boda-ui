import gql from 'graphql-tag';

export const LOAD_GUESTS = gql`
  query loadGuests {
    id
    name
    type
    age
  }
`;

export const LOAD_FAMILIES_QUERY = gql`
  query loadFamilies {
    families {
      id
      name
      guests {
        id
        name
        type
        age
      }
    }
  }
`;
