import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AdvertisementList, AdsCreate } from '../components/Advertisements/';
import { DemoAds } from '../components/DemoAds';
import { PanelOverview } from '../components/Panel/';
import { DeviceLanding } from '../components/Device';

import App from '../App';
import { PanelLayoutOverview } from '../components/PanelLayout';
import { CreatePanel } from '../components/CreatePanel';
import { CreatePanelLayout } from '../components/CreatePanelLayout';
import { EditPanelLayout } from '../components/EditPanelLayout';
import { PanelLayoutProvider } from '../components/Providers/PanelLayoutProvider';
import { Login } from '../components/Authentication/login';
import { Register } from '../components/Authentication/register';

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<App />}>
          <Route path={'/Devices'} element={<DeviceLanding />} />
          <Route path={'/AdvertisementList'} element={<AdvertisementList />} />
          <Route path={'/Panel'} element={<PanelOverview />} />
          <Route
            path={'/PanelLayoutOverview'}
            element={<PanelLayoutOverview />}
          />
          <Route path={'/AdsCreate'} element={<AdsCreate editMode={false} />} />
          <Route path={'/CreatePanel'} element={<CreatePanel />} />
          <Route
            path={'/EditAdvertisement/:advertisementId'}
            element={<AdsCreate editMode={true} />}
          />
          <Route
            path={'/CreatePanelLayout'}
            element={
              <PanelLayoutProvider>
                <CreatePanelLayout />
              </PanelLayoutProvider>
            }
          />
          <Route
            path={'/UpdatePanelLayout/:panelLayoutId'}
            element={
              <PanelLayoutProvider>
                <EditPanelLayout />
              </PanelLayoutProvider>
            }
          />
          <Route path={'/Login'} element={<Login />} />
          <Route path={'/Register'} element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};
