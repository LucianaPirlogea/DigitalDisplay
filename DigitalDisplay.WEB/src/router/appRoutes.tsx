import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AdvertisementList, AdsCreate } from '../components/Advertisements/';
import { PanelOverview } from '../components/Panel/';
import { DeviceLanding } from '../components/Device';

import App from '../App';
import { PanelLayoutOverview } from '../components/PanelLayout';
import { CreatePanel } from '../components/CreatePanel';
import { CreatePanelLayout } from '../components/CreatePanelLayout';
import { EditPanelLayout } from '../components/EditPanelLayout';
import { PanelLayoutProvider } from '../components/Providers/PanelLayoutProvider';
import { Login, Register } from '../components/Authentication';
import { getToken, isAdmin, isLogged } from '../utils/authUtils';

const PrivateRouteAdmin = ({ children }: any) => {
  if (isAdmin()) {
    return children
  }

  return <Navigate to="/" />
}

const PrivateRouteUser = ({ children }: any) => {
  if (isLogged(getToken())) {
    return children
  }

  return <Navigate to="/Login" />
}

export const AppRoutes: FC = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<App />}>
          <Route path={'/Devices'}
            element={<PrivateRouteUser>
              <DeviceLanding />
            </PrivateRouteUser>} />
          <Route path={'/AdvertisementList'}
            element={<PrivateRouteUser>
              <AdvertisementList />
            </PrivateRouteUser>} />
          <Route path={'/Panel'}
            element={<PrivateRouteUser>
              <PanelOverview />
            </PrivateRouteUser>} />
          <Route
            path={'/PanelLayoutOverview'}
            element={<PrivateRouteUser>
              <PanelLayoutOverview />
            </PrivateRouteUser>}
          />
          <Route path={'/AdsCreate'} element={<PrivateRouteAdmin>
            <AdsCreate editMode={false} />
          </PrivateRouteAdmin>} />
          <Route path={'/CreatePanel'} element={<PrivateRouteAdmin>
            <CreatePanel />
          </PrivateRouteAdmin>} />
          <Route
            path={'/EditAdvertisement/:advertisementId'}
            element={<PrivateRouteAdmin>
              <AdsCreate editMode={true} />
            </PrivateRouteAdmin>}
          />
          <Route
            path={'/CreatePanelLayout'}
            element={<PrivateRouteAdmin>
              <PanelLayoutProvider>
                <CreatePanelLayout />
              </PanelLayoutProvider>
            </PrivateRouteAdmin>
            }
          />
          <Route
            path={'/UpdatePanelLayout/:panelLayoutId'}
            element={
              <PrivateRouteAdmin>
                <PanelLayoutProvider>
                  <EditPanelLayout />
                </PanelLayoutProvider>
              </PrivateRouteAdmin>
            }
          />
          <Route path={'/Login'} element={<Login />} />
          <Route path={'/Register'} element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};
