let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname ==="localhost"){
    backendHost = "http://localhost:8080";
}

export const API_BASIC_URL = `${backendHost}`;