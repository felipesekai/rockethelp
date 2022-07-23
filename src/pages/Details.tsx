import { Heading, HStack, ScrollView, Text, useTheme, VStack } from 'native-base';
import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import { OrderProps } from '../components/Order';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderfirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import Loading from '../components/Loading';
import { CircleWavyCheck, Clipboard, DesktopTower, Hourglass } from 'phosphor-react-native';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';

type RouteParams = {
    orderId: string;
}

type OrderDetails = OrderProps & {
    description: string;
    solution: string;
    closed: string;
}

export function Details() {

    const [isLoading, setIsLoading] = useState(true);
    const [solution, setSolution] = useState('');
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)
    const route = useRoute();
    const { orderId } = route.params as RouteParams;
    const navigation = useNavigation();
    const { colors } = useTheme();

    function handleOrderClose() {
        if (!solution) {
            return Alert.alert('Solicitação', 'informe a solução para encerrar a solicitação');
        }

        firestore().collection('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp()
            }).then(() => {
                Alert.alert('Solicitação', 'solicitação encerrada');
                navigation.goBack();
            }).catch(err => {
                console.log(err);
                Alert.alert('Solicitação', 'Não foi possivel encerrada a solicitação');


            })


    }

    useEffect(() => {
        firestore()
            .collection<OrderFirestoreDTO>('orders').doc(orderId)
            .get()
            .then((doc) => {
                const { patrimony, description, status, created_at, closed_at, solution } = doc.data();
                const closed = closed_at ? dateFormat(closed_at) : null;

                setOrder({
                    id: doc.id,
                    patrimony,
                    description,
                    status,
                    solution,
                    when: dateFormat(created_at),
                    closed,
                })
                setIsLoading(false);
            })
    }, [])

    if (isLoading) {
        return <Loading />
    }
    return (
        <VStack flex={1} bg='gray.700'>
            <Header title="Solicitação" />

            <HStack bg='gray.500' justifyContent='center' p='4'>
                {order.status === 'closed'
                    ? <CircleWavyCheck size={22} color={colors.green[300]} />
                    : <Hourglass size={22} color={colors.secondary[700]} />}
                <Text
                    ml={4}
                    textTransform='uppercase'
                    fontSize={'sm'}
                    color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
                >
                    {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
                </Text>
            </HStack>
            <ScrollView mx={5} showsVerticalScrollIndicator={false}>
                <CardDetails
                    title='equipamento'
                    description={`Patrimônio ${order.patrimony}`}
                    icon={DesktopTower}
                    footer={`${order.when}`}
                />
                <CardDetails
                    title='Descrição do Problema'
                    description={order.description}
                    icon={Clipboard}
                />
                <CardDetails
                    title='Solução'
                    description={order.solution}
                    icon={CircleWavyCheck}
                    footer={order.closed && `Encerrado em: ${order.closed}`}
                >
                    {order.status === 'open' &&

                        <Input
                            placeholder='Descrição da solução'
                            onChangeText={setSolution}
                            textAlignVertical='top'
                            multiline
                            h={24}
                        />
                    }
                </CardDetails>
            </ScrollView>
            {order.status === 'open' &&
                <Button
                    title="encerrar solicitação"
                    m={5}
                    onPress={handleOrderClose}
                />
            }
        </VStack>
    );
}