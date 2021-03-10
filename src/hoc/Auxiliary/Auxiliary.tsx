import React from "react";

interface AuxProps {
  children?: any;
}

const Aux: React.FC<AuxProps> = ({ children }) => children;

export default Aux;
