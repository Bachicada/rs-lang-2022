import { API_URL, ENDPOINTS } from "../utils/Constants";

interface UserStatisticsOptional {
  audiocall?: string;
  sprint?: string;
}

interface UserStatistics {
  learnedWords: number;
  optional: UserStatisticsOptional;
}


export const getUserStatistics = async() => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  const content = rawResponse.status === 200 ? await rawResponse.json() : null;
  return content;
}


export const createUserStatistics = async (statistics: UserStatistics) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const oldStat = await getUserStatistics();
  if (oldStat) {
    statistics.learnedWords += oldStat.learnedWords;
    if (oldStat.optional.audiocall) {
      const newInfo = statistics.optional.audiocall ? statistics.optional.audiocall : '';
      statistics.optional.audiocall = oldStat.optional.audiocall + newInfo;
    }
    if (oldStat.optional.sprint) {
      const newInfo = statistics.optional.sprint ? statistics.optional.sprint : '';
      statistics.optional.sprint = oldStat.optional.sprint + newInfo;
    }
  }

  const options = {
    method:'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statistics)
  }

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`, options);

  const content = await rawResponse.json();

  console.log('STAT is  ', content);
};