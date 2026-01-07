import { LoginData } from "@/app/login/page";
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
        const res = await axios.post<LoginUserResponse>('/api/auth/login', payload, {
            signal: AbortSignal.timeout(10000) // auto timeout after 10s
        });
        if (res?.data?.message) {
            window.location.href = "/dashboard";
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