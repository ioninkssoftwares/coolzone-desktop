import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
   <Home></Home>
    ),
  },
  {
    path: "/products",
    element: (
      <Products/>
    ),
  },
]);

function App() {
  return (
    <>
<div className='App'>
<RouterProvider router={router} />
</div>
    </>
  )
}

export default App
