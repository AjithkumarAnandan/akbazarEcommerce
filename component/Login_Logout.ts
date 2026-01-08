import { LoginData } from "@/app/login/page";
import { authLogin,dashboardPath } from "@/utils/api.path";
import axios from "axios";
import { toast } from "react-toastify";

interface LoginUserResponse {
    message: string;
    token?: string; // whatever your API returns
}

export async function getLoginUser({ payload }: { payload: LoginData })
//  Promise<{ data: LoginUserResponse | null; error: AxiosError | Error | null }> 
{
    try {
        const res = await axios.post<LoginUserResponse>(authLogin, payload, {
            signal: AbortSignal.timeout(10000) // auto timeout after 10s
        });
        if (res?.data?.message) {
            window.location.href = `${dashboardPath}`;
            toast.success(res?.data?.message);
        }
        return;
    } catch (err) {
        if (axios.isCancel(err)) {
            toast.error("Request timed out");
        } else {
            const errorMessage =
                axios.isAxiosError(err)
                    ? err.response?.data?.message || err.message
                    : (err as Error).message || "Login failed";

            toast.error(errorMessage);
        }
        return
    }
}