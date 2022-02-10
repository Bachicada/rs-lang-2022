
import { PartProps } from "../types";
import { API_URL, ENDPOINTS } from "../utils/Constants";

export async function getWords() {
        try {
            const words = await fetch(`${API_URL}${ENDPOINTS.WORDS}`, {
              method: 'GET'
            });
            return await words.json();
        }
        catch(e) {
          console.log('error', e);
        }
    }

export const getPartOfTextbook = async(pageNumber: string | undefined, partNumber: string | undefined ) =>{
  const page = await fetch(`${API_URL}${ENDPOINTS.WORDS}?${ENDPOINTS.PAGE}${pageNumber}&${ENDPOINTS.GROUP}${partNumber}`,{
    method: 'GET',
  });
  return page.json();
}
  //https://<your-app-name>.herokuapp.com/words?page=2&group=0