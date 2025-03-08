import { useCallback, useEffect, useState } from '@lynx-js/react';

import './App.css';
import arrow from './assets/arrow.png';
import lynxLogo from './assets/lynx-logo.png';
import reactLynxLogo from './assets/react-logo.png';

export function App() {
  const [alterLogo, setAlterLogo] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.info('Hello, ReactLynx');
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://randomuser.me/api/?page=3&results=100&seed=abc',
        );
        const data = await response.json();
        console.log('TCL: fetchData -> data', data);
        setData(data?.results);
      } catch (error) {
        console.log('TCL: fetchData -> error', error);
      }
    };
    fetchData();
  }, []);

  const onTap = useCallback(() => {
    'background only';
    setAlterLogo(!alterLogo);
  }, [alterLogo]);

  return (
    <view>
      {/* <view className="Background" /> */}
      <view className="App">
        <view className="Banner">
          <view className="Logo" bindtap={onTap}>
            {alterLogo ? (
              <image src={reactLynxLogo} className="Logo--react" />
            ) : (
              <image src={lynxLogo} className="Logo--lynx" />
            )}
          </view>
          <text className="Title">trying lynx</text>
        </view>
        <view style={{ height: '70vh' }}>
          <scroll-view
            scroll-orientation="vertical"
            style={{
              width: '100%',
              height: '100%',
              paddingLeft: '10px',
              marginLeft: '5px',
            }}
          >
            {data?.map((item) => (
              <view
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '50px',
                  columnGap: '10px',
                  width: '100vh',
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              >
                <image
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '35px',
                  }}
                  src={item?.picture?.thumbnail}
                />
                <text
                  style={{ color: '#fff' }}
                >{`${item.name.first} ${item?.name?.last}`}</text>
              </view>
            ))}
          </scroll-view>
        </view>
      </view>
    </view>
  );
}
