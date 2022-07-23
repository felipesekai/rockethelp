import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timesTemp: FirebaseFirestoreTypes.Timestamp) {
    if (timesTemp) {
        const date = new Date(timesTemp.toDate());

        const day = date.toLocaleDateString('pt-BR');
        const hour = date.toLocaleTimeString('pt-BR');

        return `${day} às ${hour}`;
    }
}