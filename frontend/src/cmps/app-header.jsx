import { NavLink,Link } from "react-router-dom";


export function AppHeader() {

    return (
        <header className="app-header full main-layout ">
            <Link to="/"> <h1>Mister Toy</h1></Link>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>

        </header>
    )
}