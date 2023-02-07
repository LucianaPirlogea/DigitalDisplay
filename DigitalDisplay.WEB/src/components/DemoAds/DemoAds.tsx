import { FC, useCallback, useEffect, useState } from 'react';
import API, { defaultHeaders } from '../../api';

//SERVICE
export async function getAdvertisments() {
  const res = await API.get('Advertisement', {
    redirectWhenUnauthorized: false,
    headers: defaultHeaders,
  });

  return res;
}

//FC
export const DemoAds: FC = () => {
  //useState HOok
  const [demoAds, setDemoAds] = useState<unknown>([]);

  //GETData Callback
  const getAdvertisements = useCallback(async () => {
    const res = await getAdvertisments();
    setDemoAds(res);
    return res;
  }, []);

  //Oppimizations

  useEffect(() => {
    getAdvertisements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {JSON.stringify(demoAds)}
      <div>This is the advertisements page</div>;
    </>
  );
};
