import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

export function DashboardH(){
    async function handleLogout(){
        await signOut(auth);

    }

    return(
        <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            
            <Link to="/dashboard/parceiros">
                Cadastrar Empresa
            </Link>

            <button className="ml-auto" onClick={handleLogout}>
                Sair da Conta

            </button>
        </div>
    )
}