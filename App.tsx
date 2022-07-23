import { NativeBaseProvider, StatusBar } from 'native-base'
import Signin from './src/pages/SignIn';
import { Home } from './src/pages/Home';
import { Register } from './src/pages/Register';
import { Routes } from './src/routes';
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Loading from './src/components/Loading';

export default function App() {
  const [fonstLoading] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={'transparent'}
        translucent
      />
      {fonstLoading ? <Routes /> : <Loading />}
    </NativeBaseProvider>

  );
}


