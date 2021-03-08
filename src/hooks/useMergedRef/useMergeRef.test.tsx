import React, { FC, useRef } from "react";
import { render as renderComponent } from "@testing-library/react";
import useMergedRef from "./useMergedRef";

const render = (children: any): any => renderComponent(children);

describe("useMergedRef", () => {
  it("merges object and function refs", () => {
    const refValues: any = {};

    const RefComponent: FC = () => {
      const refA = useRef<HTMLDivElement>(null);

      const refB_ = useRef<HTMLDivElement>(null);
      const refB = (el: HTMLDivElement): void => {
        // @ts-ignore
        refB_.current = el;
      };

      const ref = useMergedRef(refA, refB);
      React.useEffect(() => {
        refValues.a = refA.current;
        refValues.b = refB_.current;
      });

      return React.createElement("div", { ref });
    };

    render(React.createElement(RefComponent));
    expect(refValues.a).toBe(refValues.b);
  });
});
