import Head from "next/head";
import { useState } from "react";
import { Launch } from "../components";
import { useLaunchesPastQuery } from "../hooks";
import type { Launch as TLaunch } from "../types";

export default function Home() {
  const [variables, setVariables] = useState({
    find: { mission_name: "", rocket_name: "" },
  });

  const [filters, setFilters] = useState({
    mission_name: "",
    rocket_name: "",
  });
  const {
    data,
    loading: isLoading,
    error,
    fetchMore,
  } = useLaunchesPastQuery(variables);
  const [selectedLaunches, setSelectedLaunches] = useState<TLaunch[]>([]);

  const onClickLoadMore = () => {
    fetchMore({
      variables: {
        offset: data?.launchesPast?.length || 0,
      },
    });
  };

  const onLaunchClick = (launch?: TLaunch | null) => {
    if (!launch) return;

    if (selectedLaunches.includes(launch)) {
      setSelectedLaunches(selectedLaunches.filter((l) => l !== launch));
      return;
    }
    if (selectedLaunches.length === 2) return;
    setSelectedLaunches([...selectedLaunches, launch]);
  };

  return (
    <div>
      <Head>
        <title>SpaceX Launches</title>
        <meta
          name="description"
          content="See past SpaceX launches, compare two launches."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-lg px-2 mx-auto">
        <h1 className="text-center text-3xl font-bold">SpaceX Launches</h1>
        <p className="text-center">
          See past SpaceX launches, compare two launches.
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2">
            <span className="block sm:inline">{error.message}</span>
          </div>
        )}
        <div className="mb-2">
          <h3 className="text-center text-2xl font-semibold">Filters</h3>
          <div className="flex space-x-1">
            <div>
              <label htmlFor="mission_name">Mission name</label>
              <input
                id="mission_name"
                type="text"
                className="w-full border border-gray-500 rounded-md p-2"
                value={filters.mission_name}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    mission_name: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="rocket_name">Rocket name</label>
              <input
                id="rocket_name"
                type="text"
                className="w-full border border-gray-500 rounded-md p-2"
                value={filters.rocket_name}
                onChange={(e) =>
                  setFilters({ ...filters, rocket_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button
              className="p-2 rounded-md border border-gray-500"
              onClick={() => {
                setVariables({
                  find: {
                    mission_name: filters.mission_name,
                    rocket_name: filters.rocket_name,
                  },
                });
                setSelectedLaunches([]);
              }}
            >
              Search
            </button>
          </div>
        </div>

        {!!selectedLaunches?.length && (
          <div className="mb-2">
            <h3 className="text-center text-2xl font-semibold">
              Selected Missions
            </h3>
            <div className="flex justify-between items-center">
              <div>
                {selectedLaunches.map((launch, index) => (
                  <p key={launch.id}>
                    Mission {index + 1}:{" "}
                    <b>
                      <i>{launch.mission_name}</i>
                    </b>
                  </p>
                ))}
              </div>
              <button
                disabled={selectedLaunches.length < 2}
                className="p-2 rounded-md border border-gray-500 disabled:cursor-not-allowed"
              >
                Compare
              </button>
            </div>
          </div>
        )}
        {!isLoading && !error && !data?.launchesPast?.length && (
          <p className="text-center">No launches found</p>
        )}
        {data?.launchesPast &&
          data.launchesPast.map((launch) => (
            <div
              key={launch?.id}
              className={
                selectedLaunches.includes(launch) || selectedLaunches.length < 2
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }
              onClick={() => {
                onLaunchClick(launch);
              }}
            >
              <Launch
                className="mb-4"
                launch={launch || {}}
                isSelected={selectedLaunches.includes(launch)}
              />
            </div>
          ))}
        {isLoading && <p className="text-center">Loading...</p>}
        {!isLoading && !error && !!data?.launchesPast?.length && (
          <div className="flex justify-center">
            <button
              onClick={onClickLoadMore}
              className="p-2 rounded-md border border-gray-500 disabled:cursor-not-allowed"
            >
              Load more
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
