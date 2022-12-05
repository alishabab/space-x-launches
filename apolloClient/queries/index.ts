import { gql } from '@apollo/client';
export const LAUNCHES_PAST_QUERY = gql`
  query launchesPast($find: LaunchFind, $limit: Int, $offset: Int) {
    launchesPast(limit: $limit, offset: $offset, find: $find) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      launch_success
      links {
        wikipedia
      }
      rocket {
        rocket_name
        rocket_type
        first_stage {
          cores {
            flight
          }
        }
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;
