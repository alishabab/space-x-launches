import Image from "next/image";
type TProps = {
  name?: string | null;
  home_port?: string | null;
  image?: string | null;
};

export const Ship = ({ name, home_port, image }: TProps) => {
  return (
    <div className="flex space-x-2 my-2">
      {image && (
        <Image
          loader={() => image}
          src={image}
          alt={name || "ship"}
          width={200}
          height={150}
        />
      )}
      <div>
        <p>
          Ship name: <b>{name}</b>
        </p>
        <p>
          Home port: <b>{home_port}</b>
        </p>
      </div>
    </div>
  );
};
