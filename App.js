import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  StatusBar,
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
      let tipF = (tipPer / 100) * subtotal;
      setTip(tipF.toFixed(2));

      //get total amount including tip
      let totalF = parseFloat(subtotal) + parseFloat(tip);
      console.log(totalF);
      setTotal(totalF.toFixed(2));

      //get total per person without the tip
      let eTotalF = subtotal / parseFloat(ppl);
      setETotal(eTotalF.toFixed(2));

      //get total per person with tip
      let eTotalTipF = totalF / parseFloat(ppl);
      setETotalTip(eTotalTipF.toFixed(2));

      //receipt will show after calculations
      setIsClicked(true);
    }
  }

  function Receipt({ display }) {
    if (display) {
      return (
        <View style={styles.parent}>
          <View style={styles.receipt}>
            <Text style={styles.textR}>Subtotal: {subtotal}</Text>

            <Text style={styles.textR}>Tip: {tip}</Text>

            <Text style={styles.total}>Total: {total}</Text>

            <Text style={styles.subtitle}>Per Person</Text>

            <Text style={styles.textR}>Subtotal: {eTotal}</Text>

            <Text style={styles.total}>Total (With Tip): {eTotalTip}</Text>
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

      <Button style={styles.btn} onPress={calculate} title="Calculate" />

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
    padding: 10,
  },
  frow: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    maxHeight: 150,
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
  textR: {
    fontSize: 30,
  },
  subtitle: {
    fontSize: 35,
    textDecorationLine: "underline",
    marginTop: 5,
  },
  total: {
    fontWeight: "bold",
    fontSize: 30,
  },
  parent: {
    margin: 5,
  },
  receipt: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  /*btn{

  }*/
});
