import { endpoints } from "../api"
import { setLoading, setToken } from "../../components/store/reducers/authReducer"
import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../components/store/reducers/profileReducer"
import { useSelector , useDispatch } from "react-redux"
import { contactusEndpoint } from "../api"
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints
// const {loading} = useSelector(state=>state.auth)
const {CONTACT_US_API} = contactusEndpoint

export const sendOtp = (email, navigate) => async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", SENDOTP_API, {
            email,
            checkUserPresent: true,
        })
        console.log("SENDOTP API RESPONSE............", response)
        console.log(response.data.success)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
    } catch (error) {
        console.log("SENDOTP API ERROR............", error)
        toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}

export const signup = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", SIGNUP_API, {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        })
        console.log("SIGNUP API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
    } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
    }
    dispatch(setLoading(false))
}

export const login = (email, password, navigate) => async (dispatch) => {
    const toastId = toast.loading("loading...")
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", LOGIN_API, { email, password })
        console.log("LOGIN API RESPONSE............", response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const imageData = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: imageData }))

        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")

    } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}

export const logout = (navigate) => async (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
}

export const getPasswordResetToken = (email, setEmailSent, loading) => async (dispatch) => {

    dispatch(setLoading(true))

    try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
            email
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Email Sent Successful")
        setEmailSent(true)
        console.log("Reset password token response ....", response)
    } catch (error) {
        console.log("RESET PASSWORD TOKEN ERROR")
        toast.error("Failed to send email. Please try again later")
    }
    dispatch(setLoading(false))
}

export const resetPassword = (password, confirmPassword, token) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password updated successfully")
        console.log("Reset password response....", response)
    } catch (error) {
        console.log("FAILED TO RESET YOUR PASSWORD")
        toast.error("Failed to reset your password. Please try again later")
    }
    dispatch(setLoading(false))
}

export const contactUs = (data)=>async (dispatch)=>{
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("POST",CONTACT_US_API,data)
        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Your message has been sent successfully")
        console.log("contact us form related data...",response)
    } catch (error) {
        console.log("FAILED TO SEND YOUR CONTACT US MESSAGE")
        toast.error("Failed to send message. Please try again later")
    }
    dispatch(setLoading(false))
}