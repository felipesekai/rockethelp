import { VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleNewOrder() {
        if (!patrimony || !description) {
            return Alert.alert('Registrar', 'Preencha todos os campos')
        }
        setIsLoading(true);

        firestore().collection('orders').add({
            patrimony,
            description,
            status: 'open',
            created_at: firestore.FieldValue.serverTimestamp()
        }).then(() => {
            Alert.alert('Solicitação', 'Solicitação resgistrado com sucesso');
            navigation.goBack();
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
            Alert.alert('Solicitação', 'Não foi possivel registrar o pedido');
        })


    }

    return (
        <VStack flex={1} bg='gray.600'>
            <Header title="Nova Solicitação" />
            <VStack flex={1} pb={6} px={6}>

                <Input
                    placeholder='numero do patrimonio'
                    mt={4}
                    onChangeText={setPatrimony}
                />
                <Input
                    placeholder='Descrição do problema'
                    mt={5}
                    flex={1}
                    multiline
                    textAlignVertical='top'
                    onChangeText={setDescription}
                />
                <Button
                    isLoading={isLoading}
                    title='Cadastrar'
                    mt={5}
                    onPress={handleNewOrder}
                />
            </VStack>

        </VStack>
    );
}