import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#ffffff'
    },
    title: {
        padding: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    border: {
        height: '100%',
        width: 6,
        backgroundColor: 'red',
        marginRight: 16
    },
    flex: {
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    item: {
        paddingTop: 10,
        width: '25%',
        height: 110,
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default styles