import React from "react";
import MockAdapter from "axios-mock-adapter";
import { render, waitForElement } from "@testing-library/react";
import useAxios from "./useAxios";
import axios from "../../shared/config/axios";

it("should be a function", () => {
  expect(useAxios).toEqual(expect.any(Function));
});

// it("use custom instance", async () => {
//   const mock = new MockAdapter(axios);
//   mock.onGet("/test").reply(200, {
//     foo: "bar",
//   });

//   // const App = () => {
//   const { response, loading, error, sendRequest } = useAxios({
//     url: "/test",
//   });
//   sendRequest();
//   console.log(response);
//   //   return <div>{((response || {}).data || {}).foo}</div>;
//   // };
//   // const { getByText } = render(<App />);
//   // await waitForElement(() => getByText("bar"));
// });
