import React, { Component } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ArchivedPage from './pages/ArchivedPage';
import AddPage from './pages/AddPage';
import NotFound from './components/NotFound';
import PropTypes from 'prop-types';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';

function NoteAppWrapper() {
    const navigate = useNavigate();

    return <NoteApp navigate={navigate} />;
}

export class NoteApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authedUser: null,
            initializing: true,
            theme: localStorage.getItem('theme') || 'light',
            toggleTheme: () => {
                this.setState((prevState) => {
                    const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme', newTheme);
                    return {
                        theme: newTheme
                    };
                });
            },
            localeContext: {
                locale: localStorage.getItem('locale') || 'id',
                toggleLocale: () => {
                    this.setState((prevState) => {
                        const newLocale = prevState.localeContext.locale === 'id' ? 'en' : 'id';
                        localStorage.setItem('locale', newLocale);
                        return {
                            localeContext: {
                                ...prevState.localeContext,
                                locale: newLocale
                            }
                        };
                    });
                }
            }
        };

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    async componentDidMount() {
        document.body.classList.add(this.state.theme);

        const { data } = await getUserLogged();
        this.setState(() => {
            return {
                authedUser: data,
                initializing: false
            };
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            document.body.classList.remove(prevState.theme);
            document.body.classList.add(this.state.theme);
        }
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        this.setState(() => {
            return {
                authedUser: data
            };
        });
    }

    onLogout() {
        this.setState(() => {
            return {
                authedUser: null
            };
        });
        putAccessToken('');
    }

    render() {
        if (this.state.initializing) {
            return null;
        }

        if (this.state.authedUser === null) {
            return (
                <LocaleProvider value={this.state.localeContext}>
                    <Routes>
                        <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                        <Route path='/register' element={<RegisterPage />} />
                    </Routes>
                </LocaleProvider>
            );
        }

        const { authedUser } = this.state;

        return (
            <LocaleProvider value={this.state.localeContext}>
                <ThemeProvider value={this.state}>
                    <Header authedUser={authedUser} logout={this.onLogout} />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/archived' element={<ArchivedPage />} />
                        <Route path='/note/:id' element={<DetailPage />} />
                        <Route path='/add' element={<AddPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ThemeProvider>
            </LocaleProvider>
        );
    }
}

NoteApp.propTypes = {
    navigate: PropTypes.func.isRequired
};

export default NoteAppWrapper;
