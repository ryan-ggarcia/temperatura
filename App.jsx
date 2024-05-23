import { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cloud from './src/images/cloud.png'
import Sol from './src/images/sun.png'
import Cold from './src/images/cold.png'
import Fundo from './src/images/fundo.png'
import Globo from './src/images/globo.png'



const Saudacao = ({ nome }) => {
  return (
    <View style={styles.filha}>
      <Text style={styles.boasVindas}> Olá, {nome} </Text>
    </View>
  )
}

const Card = ({ temp, local, umidade, nav, terca, quinta, estacao }) => {

  return (
    <TouchableOpacity
      onPress={() => nav.navigate('Details', {
        Temperatura: temp,
        Local: local,
        Umidade: umidade,
        Terca: terca,
        Quinta: quinta,
        Estacao: estacao

      })}>
      {/* configurações do card */}

      <View style={styles.cardTemp} >

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>

          {/* configuração das imagens */}

          <View style={{ flexDirection: 'column', marginRight: 10, alignItems:'center' }}>
            <View>
              <Image source={temp > 30 ? Sol : temp > 20 ? Cloud : Cold} />
            </View>

            <View>
              <Text style={{ color: 'white', fontSize: 25 }}>
                {temp}Cº
              </Text>
            </View>

          </View>

          {/* configurações dos locais */}
          <View style={{marginTop:60, marginLeft:30}} >

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
            "Local": "Lab-Inf-1",
            "Terca": "20° / 18°",
            "Quinta": "24° / 20° ",
            "Estacao": "Frio",

          },
          {
            "Temperatura": 27,
            "Umidade": 45,
            "Local": "Lab-Inf-2",
            "Terca": "25° / 20°",
            "Quinta": "16° / 18° ",
            "Estacao": "Agradável"

          },
          {
            "Temperatura": 36,
            "Umidade": 50,
            "Local": "Usinagem",
            "Terca": "30° / 20°",
            "Quinta": "33° / 16° ",
            "Estacao": "Calor"

          },
          {
            "Temperatura": 40,
            "Umidade": 46,
            "Local": "Refeitorio",
            "Terca": "34° / 30°",
            "Quinta": "40° / 38° ",
            "Estacao": "Calor"
          },
          {
            "Temperatura": 29,
            "Umidade": 49,
            "Local": "Lab. Eletronica",
            "Terca": "21° / 22°",
            "Quinta": "35° / 21° ",
            "Estacao": "Agradável"
          },
          {
            "Temperatura": 18,
            "Umidade": 39,
            "Local": "Lab. Química",
            "Terca": "20° / 19°",
            "Quinta": "31° / 18° ",
            "Estacao": "Frio"
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Saudacao nome={'Roberto'} />
          <View>
            {
              dados.map((dado, i) => <Card
                temp={dado.Temperatura}
                local={dado.Local}
                umidade={dado.Umidade}
                terca={dado.Terca}
                quinta={dado.Quinta}
                nav={navigation}
                estacao={dado.Estacao}
                key={i}

              />)
            }
          </View>
        </ScrollView>

      </SafeAreaView>

    </>
  )

}

const DetalhesScreen = ({ route, navigation }) => {
  const { Temperatura, Local, Umidade, Terca, Quinta, Estacao } = route.params
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={Fundo} style={{ backgroundColor: '#ADEEE3', flex: 1, }}>

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
                <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }} >
                  {Estacao}
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

          {/* Card de historicos */}
          <View style={styles.cardTemp}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

              <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, }}>
                Historico de temperatura
              </Text>

              <View>
                <Image source={Globo} style={{ marginLeft: 5 }} />
              </View>

            </View>

            {/* descrições */}
            <View style={{height:100, width:200, justifyContent:'center', alignSelf:'center'}}>

              <View>
                <Text style={styles.textoDesc}>
                  Terça-feira: {Terca}
                </Text>
              </View>

              <View>
                <Text style={styles.textoDesc}>
                  Quinta-feira: {Quinta}
                </Text>

              </View>

            </View>

          </View>

        </View>
      </ImageBackground>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
    fontSize: 35,
    textAlign: 'center'
  },
  textoPerso: {
    color: '#C0FDFB'
  },
  textoDesc: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    marginTop: 10,
  }

});