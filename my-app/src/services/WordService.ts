
import { PartProps } from "../types";
import { API_URL, ENDPOINTS } from "../utils/Constants";

export async function getWords() {
        try {
            const words = await fetch(`${API_URL}${ENDPOINTS.words}`, {
              method: 'GET'
            });
            return await words.json();
        }
        catch(e) {
          console.log('error', e);
        }
    }

export const getPartOfTextbook = async(partNumber: string | undefined) =>{
  const page = await fetch(`${API_URL}${ENDPOINTS.words}?page=1&group=${partNumber}`,{
    method: 'GET',
  });
  return page.json();
}
  //https://<your-app-name>.herokuapp.com/words?page=2&group=0