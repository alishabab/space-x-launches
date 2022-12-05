import Head from "next/head";
import { useState } from "react";
import { Launch } from "../components";
import { useLaunchesPastQuery } from "../hooks";
import type { Launch as TLaunch } from "../types";

export default function Home() {
  const [variables, setVariables] = useState({
    limit: 10,
    offset: 0,
    find: { mission_name: "", rocket_name: "" },
  });
  const { data, loading, error } = useLaunchesPastQuery(variables);
  const [selectedLaunches, setSelectedLaunches] = useState<TLaunch[]>([]);

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
      </main>

      <footer></footer>
    </div>
  );
}
