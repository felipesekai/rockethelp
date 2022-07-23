import React, { useState } from 'react';
import Logo from '../assets/logo_primary.svg';
import { Icon, Pressable, useTheme, VStack, FormControl } from 'native-base';
import { Input } from '../components/Input';
import { Envelope, IdentificationBadge, Key, WarningCircle } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Header } from '../components/Header';
import * as Yup from 'yup';

type userProps = {
    name: string,
    email: string,
    password: string,
}


export const SignUp: React.FC = () => {

    const { colors } = useTheme();
    const [formData, setFormData] = useState<userProps>();
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState<userProps>({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    function handleSignUp() {
        // if (!email || !password) {
        //     return Alert.alert('Campos invalidos', 'Preencha os campos de forma correta');
        // }
        setIsLoading(true);
        verify()


    }

    async function verify() {
        let scheme = Yup.object().shape({
            name: Yup.string().required('campo nome é obrigatorio'),
            email: Yup.string().email('Email invalido').required('Email é obrigatorio'),
            password: Yup.string().min(6, 'senha deve ter no minimo 6 digitos').required().oneOf([passwordConfirm, null], 'senhas diferentes'),
        })

        await scheme.validate(formData, {
            abortEarly: false,
        }).then(() => {
            setErrors({ name: '', email: '', password: '' });

            console.log('chamou o cadastro aqui');

        }).catch(error => {
            let validateErros: userProps = { name: '', email: '', password: '' };
            if (error instanceof Yup.ValidationError) {
                error.inner.forEach(err => {
                    validateErros[err.path] = err.message
                });
                setErrors(validateErros)
            }
        }).finally(() => {
            setIsLoading(false)
        });
    }

    return (

        <VStack flex={1} alignItems='center' bg='gray.600' >

            <Header title='Cadastrar-se' />

            <VStack flex={1} alignItems='center' justifyContent='center' w='full' px={8}>

                <FormControl mb={5} isRequired isInvalid={'name' in errors}>
                    <Input
                        borderWidth={errors.name.length > 0 ? 1 : 0}
                        placeholder='Name'
                        InputLeftElement={<Icon as={<IdentificationBadge color={colors.gray[300]} />} ml='4' />}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}

                    />
                    {'name' in errors && <FormControl.ErrorMessage leftIcon={<WarningCircle size={15} color='red' />}>{errors.name}</FormControl.ErrorMessage>}
                </FormControl>

                <FormControl mb={5} isRequired isInvalid={'email' in errors}>
                    <Input
                        borderWidth={errors.email.length > 0 ? 1 : 0}
                        placeholder='Email'
                        InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml='4' />}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                    />
                    {'email' in errors && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}

                </FormControl>

                <FormControl mb={5} isRequired isInvalid={'password' in errors}>

                    <Input
                        borderWidth={errors.password.length > 0 ? 1 : 0}
                        placeholder='Senha'
                        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml='4' />}
                        secureTextEntry
                        onChangeText={(text) => setFormData({ ...formData, password: text })}

                    />
                    {'password' in errors && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}

                </FormControl>
                <FormControl mb={8} isRequired isInvalid={'password' in errors}>
                    <Input
                        placeholder='Comfirmar Senha'
                        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml='4' />}
                        secureTextEntry
                        onChangeText={setPasswordConfirm}
                    />
                </FormControl>
                <Button title='Confirmar' w={'full'} onPress={handleSignUp}
                    isLoading={isLoading}
                />
            </VStack>
        </VStack>
    );
}

