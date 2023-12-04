import Navbar from "./Navbar";
import Chat from "./Chat";


const Layout = ({children}) => {

    return(
        <>
         <Navbar />
         <main>{children}</main>
         <Chat />
        </>
    )
}

export default Layout;