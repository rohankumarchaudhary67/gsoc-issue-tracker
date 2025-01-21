import cron from 'node-cron';
import fetchIssues from './fetch-issues';
import repoList from '../repo-list';

const cronFetchSchedule = {
    start: (): void => {
        let index = 0;
        cron.schedule('0 * * * *', () => {
            const currentRepo = repoList[index];
            console.log('Fetching issues from GitHub for ', currentRepo);
            fetchIssues(currentRepo)
                .then(() =>
                    console.log('Issues fetched and stored of ', currentRepo)
                )
                .catch((err: unknown) =>
                    console.error('Error fetching issues:', err)
                );

            index = (index + 1) % repoList.length;
        });
    },
};

export default cronFetchSchedule;
