import endpoints from "@/utils/endpoints";
import { APIContext } from "astro";

async function get<T>(
	incomingReq: Request,
	endpoint: string,
	cb: (response: Response) => Promise<T>
): Promise<T> {
	const response = await fetch(`${import.meta.env.PUBLIC_API_URL}${endpoint}`, {
		headers: incomingReq.headers,
	});

	return cb(response);
}

const handleResponseError = (response: Response) => {
  return response
}

export const validateToken = async (req: Request) => {
  return get(req, endpoints.auth.validateToken(), async (response) => await response)
}

export const getSchedules = async (req: Request) => {
  return await get(req, endpoints.schedules.fetch(), (response) => response.json())
}

export const getSchedule = async (req: Request, id: string) => {
  return await get(req, endpoints.schedules.fetchById(id), (response) => response.json())
}