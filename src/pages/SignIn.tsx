import React, { useState } from 'react';
import Logo from '../assets/logo_primary.svg';
import { Heading, Icon, Image, Pressable, useTheme, VStack, useKeyboardDismissable, Link } from 'native-base';
import { Input } from '../components/Input';
import { Envelope, Key } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
const Signin: React.FC = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleSignin() {
        if (!email || !password) {
            return Alert.alert('Campos invalidos', 'Preencha os campos de forma correta');
        }
        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                // alert("sucess");
            })
            .catch(err => {
                console.log(err);

                if (err.code === 'auth/invalid-email') {
                    return Alert.alert('Entrar', "E-mail ou senha inválido.")
                }
                if (err.code === 'auth/user-not-found') {
                    return Alert.alert('Entrar', "Usúario não encontrado.")
                }

                return Alert.alert('Entrar', "E-mail ou senha inválido.")



            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    function handleSignUp() {
        navigation.navigate('signup')
        // console.log('cadastrar')
    }

    return (

        <VStack flex={1} alignItems='center' justifyContent='center' bg='gray.600' px={8}>

            <Logo />

            <Heading color='gray.100' fontSize={'xl'} mt='20' mb='6'>
                Acesse sua conta
            </Heading>
            <Input
                mb={5}
                placeholder='Email'
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml='4' />}
                onChangeText={setEmail}

            />
            <Input
                mb={8}
                placeholder='Senha'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml='4' />}
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button title='Entrar' w={'full'} onPress={handleSignin}
                isLoading={isLoading}
            />
            <Link mt='5' _text={{ color: 'white' }} onPress={handleSignUp} > Cadastre-se </Link>
        </VStack>
    );
}

export default Signin;