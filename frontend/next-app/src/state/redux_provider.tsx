import { Provider } from 'react-redux';
import { store } from './store';

// Component responsible for providing Redux store to the application
export default function ReduxProvider({
    children // Children components that will consume the Redux store
}: {
    children: React.ReactNode; // Type definition for the children prop
}) {
    // Render the Provider component from react-redux with the Redux store passed as a prop
    return <Provider store={store}>{children}</Provider>;
}
