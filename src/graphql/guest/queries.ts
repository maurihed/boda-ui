import gql from 'graphql-tag';

export const LOAD_GUESTS = gql`
  query loadGuests {
    id
    name
    type
    age
  }
`;

export const NEW_FAMILY = gql`
  mutation NewFamily($name: String!, $familySide: FamilySide!, $guests: [GuestInputType!]) {
    newFamily(name: $name, familySide: $familySide, guests: $guests) {
      id
      name
      familySide
      guests {
        id
        name
        age
        type
      }
    }
  }
`;

export const DELETE_FAMILY = gql`
  mutation DeleteFamilyMutation($familyId: Int!) {
    deleteFamily(familyId: $familyId)
  }
`;

export const LOAD_FAMILIES_QUERY = gql`
  query loadFamilies {
    families {
      id
      name
      familySide
      guests {
        id
        name
        type
        age
      }
    }
  }
`;
