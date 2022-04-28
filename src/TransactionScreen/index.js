import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, LogBox } from 'react-native';
import { useFonts, Outfit_500Medium } from '@expo-google-fonts/dev';
import AwesomeAlert from 'react-native-awesome-alerts';
import "intl";
import "intl/locale-data/jsonp/en";


LogBox.ignoreAllLogs();
export default function TransactionScreen({ navigation }) {

    const [transactions, setTransactions] = useState();
    const [showDetail, setShowDetail] = useState(false);
    const [playstation, setPlaystation] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [hours, setHours] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState();
    const [handphoneNumber, setHandphoneNumber] = useState(0);
    const [transactionTime, setTransactionTime] = useState(0);

    const getTransactions = async () => {
        const trans = await axios.get(`https://rentalps-basisdata2projekan.herokuapp.com/gettransactions`);
        console.log(trans);
        setTransactions(trans);
    }

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
    }

    useEffect(() => {
        getTransactions();
    }, [])

    let [fontsLoaded] = useFonts({
        Outfit_500Medium
    });

    if (!fontsLoaded) {
        return <ActivityIndicator style={styles.activityindicator} size='large' color='#0000ff' />;
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.blackheader}>
                        <Text style={styles.headertext}> Riwayat Transaksi </Text>
                    </View>
                    {
                        transactions?.data.map((item, index, element) => {
                            let dated = new Date(item["waktu"]);
                            let day = dated.getDay();
                            if (day == 1) {
                                day = 'Senin'
                            } else if (day == 2) {
                                day = 'Selasa';
                            } else if (day == 3) {
                                day = 'Rabu';
                            } else if (day == 4) {
                                day = 'Kamis';
                            } else if (day == 5) {
                                day = 'Jumat';
                            } else if (day == 6) {
                                day = 'Sabtu';
                            } else if (day == 7) {
                                day = 'Minggu';
                            }
                            let date = dated.getDate();
                            let month = dated.getMonth() + 1;
                            if (month == 1) {
                                month = 'Januari';
                            } else if (month == 2) {
                                month = 'Februari';
                            } else if (month == 3) {
                                month = 'Maret';
                            } else if (month == 4) {
                                month = 'April';
                            } else if (month == 5) {
                                month = 'Mei';
                            } else if (month == 6) {
                                month = 'Juni';
                            } else if (month == 7) {
                                month = 'Juli';
                            } else if (month == 8) {
                                month = 'Agustus';
                            } else if (month == 9) {
                                month = 'September';
                            } else if (month == 10) {
                                month = 'Oktober';
                            } else if (month == 11) {
                                month = 'November';
                            } else if (month == 12) {
                                month = 'Desember';
                            }
                            let year = dated.getFullYear();
                            let fullDate = `${day}, ${date} ${month} ${year}`;
                            // let check = new Date(transactions.data[index]["waktu"]).getDate() == (transactions.data[index + 1] != undefined ? new Date(transactions.data[index + 1]["waktu"]).getDate() : '');
                            // element = index + 1;
                            return (
                                <View style={{ width: '100%' }} key={index}>
                                    <View style={styles.headerdate}>
                                        <Text style={styles.headerdatetext}> {fullDate} </Text>
                                    </View>
                                    <TouchableOpacity style={styles.namepricecontainer} onPress={() => {
                                        setName(item["nama"]);
                                        setAge(item["usia"]);
                                        setHandphoneNumber(item["no_hp"]);
                                        setHours(item["jam"]);
                                        setTotalPrice(item["harga"]);
                                        setPlaystation(item["jenis_ps"]);
                                        setTransactionTime(item["waktu"]);
                                        setShowDetail(true);
                                    }}>
                                        <Text style={styles.namepricetext}>{item["nama"]}</Text>
                                        <Text style={styles.namepricetext}>{formatRupiah(item["harga"])}</Text>
                                    </TouchableOpacity>
                                    {/* <View style={styles.totalpricecontainer}>
                                        <Text style={styles.totalpricetext}>Total</Text>
                                        <Text style={styles.totalpricetext}>Rp. 12.000</Text>
                                    </View> */}
                                </View>
                            )
                        })
                    }

                    <AwesomeAlert
                        show={showDetail}
                        showProgress={false}
                        title="Detail"
                        message={
                            <View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Nama</Text>
                                    <Text style={styles.detailtext}>{name}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Usia</Text>
                                    <Text style={styles.detailtext}>{age}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>No. hp</Text>
                                    <Text style={styles.detailtext}>{handphoneNumber}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Jam</Text>
                                    <Text style={styles.detailtext}>{hours}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Jenis PS</Text>
                                    <Text style={styles.detailtext}>{playstation}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Total bayar</Text>
                                    <Text style={styles.detailtext}>{formatRupiah(totalPrice)}</Text>
                                </View>
                                <View style={styles.detailcontainer}>
                                    <Text style={styles.detailtext}>Waktu transaksi</Text>
                                    <Text style={styles.detailtext}>{`${new Date(transactionTime).getHours()}:${new Date(transactionTime).getMinutes()}`}</Text>
                                </View>
                            </View>
                        }
                        closeOnTouchOutside={true}
                        onDismiss={() => {
                            setShowDetail(false);
                        }}
                        closeOnHardwareBackPress={false}
                        showConfirmButton={true}
                        confirmText="Oke"
                        confirmButtonColor="#7cfc00"
                        onConfirmPressed={() => {
                            setShowDetail(false);
                        }} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingBottom: 30
    },
    blackheader: {
        backgroundColor: '#000',
        height: 145,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertext: {
        color: '#fff',
        fontFamily: 'Outfit_500Medium',
        fontSize: 34
    },
    activityindicator: {
        padding: 30
    },
    headerdate: {
        backgroundColor: '#F0F0F0',
        borderWidth: 0.6,
        borderColor: '#8E8383',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 58
    },
    headerdatetext: {
        color: '#000',
        fontFamily: 'Outfit_500Medium',
        fontSize: 24
    },
    namepricecontainer: {
        backgroundColor: '#fff',
        height: 39,
        borderWidth: 0.6,
        borderColor: '#8E8383',
        flexDirection: 'row',
        paddingTop: 8,
        paddingRight: 25,
        paddingBottom: 8,
        paddingLeft: 18,
        width: '100%'
    },
    namepricetext: {
        color: '#000',
        fontFamily: 'Outfit_500Medium',
        fontSize: 18,
        flex: 0.5
    },
    totalpricecontainer: {
        backgroundColor: '#67FFBF',
        height: 39,
        borderWidth: 0.6,
        borderColor: '#8E8383',
        flexDirection: 'row',
        paddingTop: 8,
        paddingRight: 25,
        paddingBottom: 8,
        paddingLeft: 18,
        width: '100%'
    },
    totalpricetext: {
        color: '#000',
        fontFamily: 'Outfit_500Medium',
        fontSize: 18,
        flex: 0.5
    },
    detailcontainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderWidth: 0.6,
        borderColor: '#8E8383',
        paddingTop: 8,
        paddingRight: 25,
        paddingBottom: 8,
        paddingLeft: 18,
    },
    detailtext: {
        color: '#000',
        fontFamily: 'Outfit_500Medium',
        fontSize: 18,
        flex: 0.5
    }
});