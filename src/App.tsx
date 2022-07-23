import axios from 'axios';
import {
	BrowserRouter,
	Routes,
	Route,
    Navigate,
} from "react-router-dom";
import auth from './common/auth';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Dashboard from './views/Dashboard';
import Logout from './views/auth/Logout';
import UserSettings from './views/user/settings/Settings';

/** Intercept HTTP requests to check if the user is not logged in anymore */
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { status } = error.response;

    if (status === 401 || status === 419) {
        if (auth.isAuthed()) {
            auth.logout();
            window.location.href = '/login';
        }
    }

    return Promise.reject(error)
});

const Authed = ({ state, children }: any) => {
    if (auth.isAuthed()) {
        /** If app isAuthed and state is true:
         *      Render children
         * If app isAuthed and state is false:
         *      Go to the dashboard because we are trying to access an invalid route
         */

        return state ? children : <Navigate to="/dashboard" />;
    }

    /** If app !isAuthed and state is true:
     *     Go to login because we are trying to access an invalid route
     *  If app !isAuthed and state is false:
     *      Render children
     */

    return state ? <Navigate to="/login" /> : children;
}

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
                {/* Non authed routes */}
                <Route path='/login' element={
                    <Authed state={false}>
                        <Login />
                    </Authed>
                } />

                <Route path='/register' element={
                    <Authed state={false}>
                        <Register />
                    </Authed>
                } />
                


                {/* Authed routes */}
                <Route path='/dashboard' element={
                    <Authed state={true}>
                        <Dashboard />
                    </Authed>
                } />

                <Route path='/user/settings' element={
                    <Authed state={true}>
                        <UserSettings />
                    </Authed>
                } />

                <Route path='/logout' element={
                    <Authed state={true}>
                        <Logout />
                    </Authed>
                } />



                {/* Non existing route */}
                <Route path='/*' element={
                    <Navigate to={'/login'} />
                } />
			</Routes>
		</BrowserRouter>
	);
}
