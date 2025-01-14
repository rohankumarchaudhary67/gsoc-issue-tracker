import cron from 'node-cron';
import fetchIssues from './fetch-issues';

const cronSchedule = {
    start: (): void => {
        cron.schedule('0 * * * *', () => {
            console.log('Fetching issues from GitHub...');
            fetchIssues()
                .then(() => console.log('Issues fetched and stored'))
                .catch((err: unknown) => console.error('Error fetching issues:', err));
        });
    },
};

export default cronSchedule;