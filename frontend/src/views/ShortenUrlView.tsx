import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import {
  Button,
  FormHelperText,
  InputAdornment,
  TextField,
} from '@mui/material';
import { post } from '../api/shorten-url';
import './ShortenUrlView.css';

interface ShortenUrlViewProps {
  setHasShortened: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const ShortenUrlView: FC<ShortenUrlViewProps> = ({
  setHasShortened,
  setValue,
}) => {
  const [url, setUrl] = useState<string>('');
  const [urlError, setUrlError] = useState<string>();

  const handleUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUrl(e.target.value);
    },
    [setUrl],
  );

  const handleSubmit = useCallback(async () => {
    if (!url) {
      setUrlError('Invalid url detected');
      return;
    }
    setUrlError(undefined);
    try {
      const result = await post({ url });
      if (result.statusCode === 400) {
        setUrlError(result.message[0])
      } else {
        setValue(result.url);
        setHasShortened(true);
      }
    } catch (err) {
      setUrlError('Failed to shorten url! Please try again later');
    }
  }, [url, setValue, setHasShortened]);

  return (
    <div className="shorten-url-view__container">
      <div className="shorten-url-view__content">
        <h1>Shorten your URL here!</h1>
        <TextField
          label="Enter URL..."
          onChange={handleUrlChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" onClick={() => handleSubmit()}>
                  Shorten
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {urlError && (
          <FormHelperText className="error__text">{urlError}</FormHelperText>
        )}
      </div>
    </div>
  );
};
