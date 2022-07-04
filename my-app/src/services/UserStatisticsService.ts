import OptionalBtns from '../components/wordCard/OptinalBtns';
import { API_URL, ENDPOINTS } from '../utils/Constants';
import { getUserAggrWords } from './UserAggregatedWordsService';

interface UserStatisticsOptional {
  audiocall?: string;
  sprint?: string;
  allNew?: string;
}

interface UserStatistics {
  learnedWords: number;
  optional: UserStatisticsOptional;
}

export const getUserStatistics = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = rawResponse.status === 200 ? await rawResponse.json() : null;
  return content;
};

export const createUserStatistics = async (statistics: UserStatistics) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);
  const prom = await getUserAggrWords();
  const newWordsCount = prom[0].totalCount[0].count;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistics),
  };
  const oldStat = await getUserStatistics();
  console.log('old', oldStat);
  console.log('new', statistics);
  if (oldStat) {
    const newStat = {
      learnedWords: newWordsCount,
      optional: {
        audiocall: [
          ...(oldStat.optional.audiocall ? oldStat.optional.audiocall : ''),
          statistics.optional.audiocall,
        ],
        sprint: [
          ...(oldStat.optional.sprint ? oldStat.optional.sprint : ''),
          statistics.optional.sprint,
        ],
        allNew: [
          ...(oldStat.optional.allNew ? oldStat.optional.allNew : ''),
          statistics.optional.allNew,
        ],
      },
    };
    options.body = JSON.stringify(newStat);
  }

  const rawResponse = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.STATISTICS}`,
    options
  );
  // const content = await rawResponse.json();
  // console.log('STAT is  ', content);
};
