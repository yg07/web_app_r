import * as React from 'react';
import Message from './Message';


export default function NotFound() {

  return (
    <>
      <h4>Page Not Found, Error 404</h4>
      <Message text = 'Error 404 - File not found!' variant = 'error'/>
    </>
    )
}