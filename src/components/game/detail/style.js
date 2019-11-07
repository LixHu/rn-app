import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        width: 66,
        height: 66,
        borderRadius: 8,
        marginRight: 8,
    },
    startBox: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee'
    },
    startBtn: {
        width: 220,
        height: 44,
    },
    startText: {
        textAlign: 'center',
        lineHeight: 44,
        backgroundColor: 'red',
        borderRadius: 8,
        color: '#fff',
        fontSize: 18,
    }
})

export default styles