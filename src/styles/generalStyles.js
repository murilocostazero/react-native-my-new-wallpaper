import { StyleSheet } from 'react-native';
import colors from './colors';

const generalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
        padding: 8
    },
    primaryLabel: {
        color: colors.text.primaryDark,
        fontSize: 14
    },
    primaryTextInput: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 0.4,
        borderColor: colors.icon,
        flex: 1,
        height: 40,
        fontSize: 12,
        color: colors.text.primaryDark
    },
    searchButton: {
        height: 30,
        width: 30,
        borderRadius: 30/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    primaryButton: {
        backgroundColor: colors.accent,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 48
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
});

export default generalStyles;