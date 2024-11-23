import * as React from 'react';
import Message from './Message';

export default function NotFound() {

  return (
      <>
        Page Not Found, Error 404
        <Message text = 'Error 404 - File not found!' variant = 'error'/>
      </>
    )
}