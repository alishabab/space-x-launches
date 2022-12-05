import { useQuery } from '@apollo/client';
import type { Query, QueryLaunchesPastArgs } from '../types';
import { LAUNCHES_PAST_QUERY } from '../apolloClient/queries';

export const useLaunchesPastQuery = (variables?: QueryLaunchesPastArgs) => {
  const { limit = 10, offset = 0, find = {} } = variables || {};
  const mission_name = find?.mission_name || '';
  const rocket_name = find?.rocket_name || '';
  return useQuery<
    { launchesPast: Query['launchesPast'] },
    QueryLaunchesPastArgs
  >(LAUNCHES_PAST_QUERY, {
    variables: {
      limit,
      offset,
      find: {
        mission_name,
        rocket_name,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
};
