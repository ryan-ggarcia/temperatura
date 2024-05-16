import { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cloud from './src/images/cloud.png'
import Sol from './src/images/sun.png'
import Cold from './src/images/cold.png'
import Fundo from './src/images/fundo.png'



const Saudacao = ({ nome }) => {
  return (
    <View style={styles.filha}>
      <Text style={styles.boasVindas}> Olá, {nome} </Text>
    </View>
  )
}

const Card = ({ temp, local, umidade, nav }) => {

  return (
    <TouchableOpacity
      onPress={() => nav.navigate('Details', {
        Temperatura: temp,
        Local: local,
        Umidade: umidade

      })}>
      <View >
        {/* configurações do card */}

        <View style={styles.cardTemp} >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>

            {/* configuração das imagens */}
            <View>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Image source={temp > 30 ? Sol : temp > 20 ? Cloud : Cold } />
              </View>
            </View>
          </View>

          {/* local */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            <View>
              <Text style={styles.textoTemp}>
                {local}
              </Text>
            </View>

          </View>
        </View>


      </View>
    </TouchableOpacity>



  )
}

const HomeScreen = ({ navigation }) => {
  return (

    <View style={{ flex: 1 }}>
      <ImageBackground source={Fundo} style={{ backgroundColor: '#ADEEE3', flex: 1, }}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 20 }}>

          <TouchableOpacity onPress={() => navigation.navigate('Locais')}>

            <Text style={styles.textoButton}>Ver locais</Text>

          </TouchableOpacity>

        </View>
      </ImageBackground>
    </View>
  )
}






const LocaisScreen = ({ navigation }) => {
  const [dados, setDados] = useState([])

  // renderização

  useEffect(() => {

    function VerTemperatura() {

      try {
        // const resposta = await fetch('http://10.111.9.5/api/temperatura')
        // const json = await resposta.json()
        // importação de Dados aqui     

        setDados([
          {
            "Temperatura": 19,
            "Umidade": 44,
            "Local": "Lab-Inf-1"
          },
          {
            "Temperatura": 27,
            "Umidade": 45,
            "Local": "Lab-Inf-2"
          },
          {
            "Temperatura": 36,
            "Umidade": 50,
            "Local": "Usinagem"
          },
          {
            "Temperatura": 40,
            "Umidade": 46,
            "Local": "Refeitorio"
          },
          {
            "Temperatura": 29,
            "Umidade": 49,
            "Local": "Lab. Eletronica"
          },
          {
            "Temperatura": 23,
            "Umidade": 39,
            "Local": "Lab. Quimica"
          }
        ])
      }
      catch (err) {
        Alert.alert('Aviso', 'Falha na conexão')
      }

    }
    VerTemperatura()
  }, [])

  // resposta e estilização

  return (
    <>

      <SafeAreaView style={styles.pai}>
        <ScrollView showsVerticalScrollIndicator>
          <Saudacao nome={'Roberto'} />
          <View>
            {
              dados.map((dado, i) => <Card temp={dado.Temperatura} local={dado.Local} umidade={dado.Umidade} nav={navigation} key={i} />)
            }
          </View>
        </ScrollView>

      </SafeAreaView>

    </>
  )

}

const DetalhesScreen = ({ route, navigation }) => {
  const { Temperatura, Local, Umidade } = route.params
  return (
    <View>
      <View style={{ alignItems: 'center' }} >
        {/* configurações do card */}

        <View style={styles.cardTemp} >

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>

            {/* Temperatura */}
            <View>
              <Text style={styles.textoTemp}> {Temperatura} C° </Text>
              <Text style={{ color: 'white', fontSize: 25 }}>
                Cloud
              </Text>
              <Text style={{ color: '#5D737E' }}>

              </Text>
            </View>

            {/* configuração das imagens */}
            <View>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Image source={Temperatura > 30 ? Sol : Temperatura > 20 ? Cloud : Cold} />
              </View>
            </View>
          </View>

          {/* local e umidade */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

            <View>
              <Text style={styles.textoPerso}>
                localizado no: {Local}
              </Text>
            </View>

            <View>
              <Text style={styles.textoPerso}> Umidade: {Umidade} </Text>
            </View>
          </View>
        </View>


      </View>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Locais' component={LocaisScreen} />
        <Stack.Screen name='Details' component={DetalhesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  pai: {
    backgroundColor: '#FCFFFD',
    flex: 1,
    padding: 10
  },
  filha: {
    margin: 10,
  },
  boasVindas: {
    fontSize: 25,
    color: '#5D737E'
  },
  cardTemp: {
    backgroundColor: '#64B6AC',
    borderRadius: 20,
    height: 200,
    padding: 10,
    marginTop: 10,
    width: 360
  },
  textoTemp: {
    color: 'white',
    fontSize: 30
  },
  textoPerso: {
    color: '#C0FDFB'
  },
  textoButton: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 30,
    backgroundColor: '#64B6AC',
    borderRadius: 20,
    height: 50,
    width: 200

  }

});
