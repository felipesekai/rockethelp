
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="signin" component={SignIn} />
            <Screen name="signup" component={SignUp} />
        </Navigator>
    );
}