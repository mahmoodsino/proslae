import { removeUser, confirmDialog, LOGIN_COMPONENT } from '../Common';
import { handelLogout } from '../server/services';

let Token:string|null =""
if (typeof window !== "undefined"){
     Token = localStorage.getItem("token" || "");
}
export default function useLogout() {
	const handleLogout = () => {
		confirmDialog ('Logout', 'Sure to logout?', async (callback:any) => {
			if (callback) {
                if(Token!==null){
                    const res = await handelLogout(Token);
                }
				removeUser();
                window.location.href="/main"
				return;
			}
		});
	};

	return {
		handleLogout,
	};
}
