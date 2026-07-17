import {Link} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../../services/firebaseConnection";

export function PanelHeader() {

    async function handleSignOut() {
        await signOut(auth);
       
    }

    return (
        <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            <Link to="/dashboard" className="cursor-pointer">
                Dashboard
            </Link>
            <Link to="/dashboard/new" className="cursor-pointer">
                Cadastrar carro
            </Link>
            <button
            className=" ml-auto cursor-pointer"
            onClick={handleSignOut}>Sair</button>
        </div>
    )
}