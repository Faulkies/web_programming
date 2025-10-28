import axios from 'axios'
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../apiClient';
import { api } from '../apiClient';
import { login } from '../../pages/store/auth/SessionSlice';
import { type } from '@testing-library/user-event/dist/type';

//API endpoints
const API_PREFIX = "/api/inft3050";

//SHA256 password hashing
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Generate a random salt: a 32-character hex string
const generateSalt = () => {
    const salt = window.crypto.randomUUID().replaceAll("-", "");
    return salt;
}

const headers = {
    'Accept': 'application/json',
    'xc-auth': 'sPi8tSXBw3BgursDPmfAJz8B3mPaHA6FQ9PWZYJZ',
};

//Constant time string comparison to prevent timing attacks
function safeEquals(a = "", b = "") {
    if (a.length !== b.length) return false;
    let out = 0;
    for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return out === 0;
}

const TryLoginUser = async (username, password, setUser) => {
    
    if (validator.isEmail(username)) {
        
        try {
            const response = await api.get(`/Patrons?where=(Email,eq,${username})`);
            
            if (response.data.list && response.data.list.length > 0) {
                const patron = response.data.list[0];
                
                const computed = await sha256(String(patron.Salt || "") + String(password || ""));
                const ok = safeEquals(computed, String(patron.HashPW || ""));
                
                if (ok) {
                    setUser({ type: "Patron", id: patron.PatronID, userName: username,});
                } else {
                    setUser({ type: "Invalid" });
                }
            } else {
                setUser({ type: "Invalid" });
            }
        } catch (error) {
            console.error("Error logging in patron:", error);
            setUser({ type: "Invalid" });
        }
    } else {
        
        try {
            await adminLogin();
            
            const response = await api.get(`/User?where=(UserName,eq,${username})`);

            if (response.data.list && response.data.list.length > 0) {
                const user = response.data.list[0];
                
                const computed = await sha256(String(user.Salt || "") + String(password || ""));
                const ok = safeEquals(computed, String(user.HashPW || ""));
                
                if (ok) {
                    setUser({ type: "User", id: user.UserID, isAdmin: user.IsAdmin, userName: username, });
                } else {
                    setUser({ type: "Invalid" });
                }
            } else {
                setUser({ type: "Invalid" });
            }
        } catch (error) {
            console.error("Error logging in user:", error);
            setUser({ type: "Invalid" });
        }
    }
}

//Add new user
const tryAddNewUser = async (payload, setResult) => {
    try {
        console.log("Checking if email exists:", payload.userName);
        
        // Check if email already exists using where clause
        const existingPatrons = await api.get(`/Patrons?where=(Email,eq,${payload.userName})`);
        
        if (existingPatrons.data.list && existingPatrons.data.list.length > 0) {
            console.log("❌ Email already exists");
            setResult("EmailExists");
            return;
        }
        
        // Continue with registration...
        const newCredentials = {
            Email: payload.userName,  
            Name: payload.customerName,
            Salt: generateSalt(),
            HashPW: ""
        };

        newCredentials.HashPW = await sha256(newCredentials.Salt + payload.password);

        const res = await axios.post(`${API_PREFIX}/Patrons`, newCredentials, {
            headers: headers,
            withCredentials: true 
        });

        console.log("✅ User created successfully");
        setResult("Success");
        
    } catch (err) {
        console.error("❌ Error:", err);
        setResult("Fail");
    }
};

export { TryLoginUser, tryAddNewUser };