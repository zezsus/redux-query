/** @format */

import { chown } from "fs";
import NavbarComponent from "./NavbarComponent";

const DefaultComponent = ({ children }: any) => {
  return (
    <div className='defaultComponent' style={{ boxSizing: "border-box" }}>
      <NavbarComponent />
      {children}
    </div>
  );
};

export default DefaultComponent;
