import React from "react";
import PropsWithChildren from "../../shared/types/props/PropsWithChildren";

interface AuxProps extends PropsWithChildren<any> {}

const Aux: React.FC<AuxProps> = (props) => props.children;

export default Aux;
