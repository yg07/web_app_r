import * as React from 'react';
import { useSnackbar } from 'notistack';

export default function Message(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    React.useEffect(() => {
      // varisnt: success, error, warning, info, default
      const key = enqueueSnackbar(props.text, { variant: props.variant, SnackbarProps: { onClick: () => closeSnackbar(key) },});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
}