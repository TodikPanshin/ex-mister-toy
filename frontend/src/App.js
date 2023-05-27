import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTrash} from '@fortawesome/free-solid-svg-icons'

import './assets/style/main.scss'

import { store } from './store/store'

import { HomePage } from './views/home-page'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { About } from './views/about'
import { ToyIndex } from './views/toy-index'
import { ToyEdit } from './views/toy-edit'
import { ToyDetails } from './views/toy-details'
import { ToyCharts } from './views/toy-charts'

library.add( faCoffee,faTrash)

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app main-layout">
                    <AppHeader />
                    <main className='full'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyCharts />} path="/toy/charts" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}

