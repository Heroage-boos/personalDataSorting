import { Get } from "../server"

export function getUserInfo(id) { 
    return Get("/api/users/"+id);
 }

export function getUserName() { 
    return Get("/api/users");
 }

export const userApi = {
	getUserInfo,
	getUserName
}
