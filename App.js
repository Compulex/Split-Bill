import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Button,
  Alert,
} from "react-native";

export default function App() {
  const [subtotal, setSubtotal] = useState(0.0);
  const [tipPer, setTipPer] = useState(0);
  const [ppl, setPpl] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  //values for the receipt
  const [total, setTotal] = useState(0.0);
  const [tip, setTip] = useState(0.0);
  const [eTotal, setETotal] = useState(0.0);
  const [eTotalTip, setETotalTip] = useState(0.0);

  function calculate() {
    if (subtotal == 0 && tip == 0 && ppl == 0) {
      Alert.alert("Enter a number");
    } else {
      //get tip number
      setTip((tipPer / 100) * subtotal);

      //get total amount including tip
      var totalF = parseFloat(subtotal) + parseFloat(tip);
      console.log(totalF);
      setTotal(totalF);

      //get total per person without the tip
      setETotal(subtotal / ppl);

      //get total per person with tip
      setETotalTip(total / parseFloat(ppl));

      //receipt will show after calculations
      setIsClicked(true);
    }
  }

  function Receipt({ display }) {
    if (display) {
      return (
        <View>
          <View style={styles.receipt}>
            <Text style={styles.textT}>Subtotal: {subtotal}</Text>

            <Text style={styles.textT}>Tip: {tip}</Text>

            <Text style={styles.total}>Total: {total}</Text>

            <Text style={styles.subTitle}>Per Person</Text>

            <Text style={styles.textT}>Total: {eTotal}</Text>

            <Text style={styles.textT}>Total (With Tip): {eTotalTip}</Text>
          </View>

          <Button onPress={reset} title="Reset" />
        </View>
      );
    }
  }

  function reset() {
    //set everything to zero
    setSubtotal(0);
    setTipPer(0);
    setPpl(0);
    setIsClicked(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.frow}>
        <View style={styles.numView}>
          <Text style={styles.text}>$ </Text>
          <TextInput
            style={styles.input}
            onChangeText={setSubtotal}
            value={subtotal}
            placeholder="00.00"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.numView}>
          <TextInput
            style={styles.input}
            onChangeText={setTipPer}
            value={tipPer}
            placeholder="15"
            keyboardType="numeric"
          />
          <Text style={styles.text}>%</Text>
        </View>

        <View style={styles.numView}>
          <Text style={styles.text}>Party of: </Text>
          <TextInput
            style={styles.input}
            onChangeText={setPpl}
            value={ppl}
            placeholder="2"
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>

      <Button onPress={calculate} title="Calculate" />

      <Receipt display={isClicked} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#85bb65",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  frow: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginStart: 15,
    marginEnd: 15,
    borderBlockColor: "white",
    borderWidth: 2,
  },
  numView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderBottomColor: "black",
    fontSize: 20,
    borderBottomWidth: 3,
  },
  text: {
    fontSize: 20,
  },
});
