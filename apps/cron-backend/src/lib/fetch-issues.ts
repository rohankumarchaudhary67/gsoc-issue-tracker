import axios from 'axios';
import repoList from '../repo-list';
import prisma from '@repo/db/db';
interface IssueProps {
    repository: string;
    html_url: string;
    number: number;
    state: string;
    title: string;
    body: string;
    comments: number;
    labels: string[];
    created_at: string;
    updated_at: string;
}
const fetchIssues = async (): Promise<void> => {
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
        throw new Error('Github token is missing.');
    }
    for (const repo of repoList) {
        const url = `https://api.github.com/repos/${repo}/issues?assignee=none`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token ${githubToken}`,
                    'User-Agent': 'GSoC-Issue-Tracker',
                },
            });
            const issues = response.data.map((issue: IssueProps) => ({
                repository: repo,
                url: issue.html_url,
                number: issue.number,
                state: issue.state,
                title: issue.title,
                comments: issue.comments,
                labels: issue.labels.map((label: any) => label.name),
                createdAt: issue.created_at,
                updatedAt: issue.updated_at,
            }));
            await prisma.issue.deleteMany({
                where: {
                    repository: repo,
                },
            });
            if (issues.length > 0) {
                await prisma.issue.createMany({
                    data: issues,
                });
            }
        } catch (error: any) {
            console.log(`Error fetch issue for ${repo}`);
        }
    }
};
export default fetchIssues;
