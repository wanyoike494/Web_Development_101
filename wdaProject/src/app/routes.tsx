import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Home } from '../pages/Home';
import { Demographics } from '../pages/Demographics';
import { Macroeconomics } from '../pages/Macroeconomics';
import { Geography } from '../pages/Geography';
import { Tourism } from '../pages/Tourism';
import { NotFound } from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'demographics',
        element: <Demographics />,
      },
      {
        path: 'macroeconomics',
        element: <Macroeconomics />,
      },
      {
        path: 'geography',
        element: <Geography />,
      },
      {
        path: 'tourism',
        element: <Tourism />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
