import { ReactNode } from "react";
type TProps = {
  children: ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: TProps) => {
  return (
    <div className="w-full fixed inset-0 z-10 bg-white overflow-auto flex justify-center">
      <button className="fixed top-8 right-16" onClick={onClose}>
        X
      </button>
      <div className="p-4">{children}</div>
    </div>
  );
};
