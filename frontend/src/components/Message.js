import * as React from 'react';
import { useSnackbar } from 'notistack';

export default function Message(props) {
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
      // varisnt: success, error, warning, info, default
      enqueueSnackbar(props.text, { variant: props.variant, preventDuplicate: true, });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
}