/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routers } from "./routers/index";
import DefaultComponent from "./components/DefaultComponent";
import { Fragment } from "react";
import { QueryClientProvider, QueryClient } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            {routers.map((router: any) => {
              const LayOut = router.isShowNav ? DefaultComponent : Fragment;
              const Page = router.page;
              return (
                <Route
                  key={router.path}
                  path={router.path}
                  element={
                    <LayOut>
                      <Page />
                    </LayOut>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
