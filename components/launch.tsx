import { CSSProperties } from "react";
import { Ship } from "./ship";
import { Launch as TLaunch } from "../types";

type TProps = {
  launch: TLaunch;
  isSelected?: boolean;
  className?: string;
  style?: CSSProperties;
};
export const Launch = ({ launch, isSelected, className, style }: TProps) => {
  const {
    mission_name,
    launch_date_local,
    launch_site,
    launch_success,
    links,
    rocket,
    ships,
  } = launch;

  const cores = rocket?.first_stage?.cores;

  return (
    <div
      style={style}
      className={`shadow-md p-4 border rounded-md ${
        isSelected ? "border-green-500" : "border-gray-300"
      }  ${className}`}
    >
      <h2 className="text-xl">
        Mission name: <b>{mission_name}</b>
      </h2>
      <p>
        Launch date: <b>{new Date(launch_date_local).toDateString()}</b>
      </p>
      <p>
        Site name: <b>{launch_site?.site_name_long}</b>
      </p>
      <p>
        Status:{" "}
        <b className={launch_success ? "text-green-500" : "text-red:500"}>
          {launch_success ? "Success" : "Failure"}
        </b>{" "}
      </p>
      {links?.wikipedia && (
        <p>
          Wikipedia link:{" "}
          <a
            className="underline"
            href={links?.wikipedia}
            rel="noreferrer"
            target="_blank"
          >
            {links?.wikipedia}
          </a>{" "}
        </p>
      )}
      <p>
        Rocket name: <b>{rocket?.rocket_name}</b>{" "}
      </p>
      <p>
        Rocket type: <b>{rocket?.rocket_type}</b>{" "}
      </p>
      <p>
        First stage core flights:{" "}
        <b>{cores && cores.map((core) => core?.flight).join(",")}</b>
      </p>

      {!!ships?.length && <p>Ships</p>}
      {
        <div>
          {ships?.map((ship) => (
            <Ship
              key={ship?.name}
              name={ship?.name}
              home_port={ship?.home_port}
              image={ship?.image}
            />
          ))}
        </div>
      }
    </div>
  );
};
