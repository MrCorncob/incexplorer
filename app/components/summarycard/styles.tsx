import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    paper: {
        backgroundColor: '#303030',
        borderRadius: 12,
    },
    title: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 14,
        innerHeight: '140%',
        letterSpacing: '0.005em',
        margin: '0 0 10px 0',
        textTransform: 'capitalize',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 24,
        innerHeight: '140%',
        letterSpacing: '0.01em',
        margin: 0,
        color: '#fff'
    }
}));

export default useStyles;