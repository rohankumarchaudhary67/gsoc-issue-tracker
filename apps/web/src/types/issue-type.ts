interface IssueType {
    id: string;
    repository: string;
    url: string;
    number: number;
    title: string;
    state: string;
    comments: number;
    labels: string[];
    createdAt: string;
    bookmarks?: object;
    isBookmarked?: boolean;
}

export default IssueType;
