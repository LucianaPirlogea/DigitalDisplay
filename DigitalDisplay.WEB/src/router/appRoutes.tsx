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

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/DemoAds'} element={<DemoAds />} />
        {/*TODELETE after getting used to it*/}
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
        </Route>
      </Routes>
    </>
  );
};
