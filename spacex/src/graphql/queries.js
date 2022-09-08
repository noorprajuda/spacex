import gql from "graphql-tag";
export const GET_SPACE_MISSION = gql`
  query GetSpaceMission($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      mission_name
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
      ships {
        image
      }
    }
  }
`;
