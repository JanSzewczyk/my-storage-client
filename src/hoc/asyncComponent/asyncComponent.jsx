import React, { useState, useEffect } from "react";

const asyncComponent = (importComponent) => {
  const AsyncComponent = (props) => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
      importComponent().then((cmp) => {
        setComponent(cmp.default);
      });
    }, []);

    const C = component;

    return C ? <C {...props} /> : null;
  };

  return AsyncComponent;
};

export default asyncComponent;
