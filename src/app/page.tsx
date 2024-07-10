import React from "react";
import Home from "./home/page";
import HomeLayout from "./home/layout";

const App = () => {
  return (
    <>
      <HomeLayout>
        <Home />
      </HomeLayout>
    </>
  );

};

export default App;