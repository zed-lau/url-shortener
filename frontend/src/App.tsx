import { useState } from 'react';
import { ShortenUrlView } from './views/ShortenUrlView';
import { CopyUrlView } from './views/CopyUrlView';
import './App.css';

function App() {
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
}

export default App;
