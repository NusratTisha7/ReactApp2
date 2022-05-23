import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Message({success, msg}) {
    if (success) {
        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">{msg}</Alert>
            </Stack>
        );
    } else {
       return(
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="warning">{msg}</Alert>
    </Stack>
       )
    }

}


