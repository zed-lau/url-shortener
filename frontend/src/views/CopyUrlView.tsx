import React, { FC, useState, useCallback } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import './CopyUrlView.css';

interface CopyUrlViewProps {
  url: string;
}

export const CopyUrlView: FC<CopyUrlViewProps> = ({ url }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  const handleCopyValue = useCallback((value: string) => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
  }, []);

  return (
    <div className="copy-url-view__container">
      <div className="copy-url-view__content">
        <h1>Your Shortened URL</h1>
        <TextField
          variant="standard"
          value={url}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleCopyValue(url)}>
                  {hasCopied ? <ContentCopyTwoToneIcon /> : <ContentCopyIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};
