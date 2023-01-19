import React, { FC, useState } from 'react';
import { ShortenUrlView } from './views/ShortenUrlView';
import { CopyUrlView } from './views/CopyUrlView';
import './App.css';

export const App: FC = () => {
  const [hasShortened, setHasShortened] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  return (
    <>
      <div className="app__container">
        {' '}
        {hasShortened ? (
          <CopyUrlView url={value} />
        ) : (
          <ShortenUrlView
            setHasShortened={setHasShortened}
            setValue={setValue}
          />
        )}
      </div>
    </>
  );
};
