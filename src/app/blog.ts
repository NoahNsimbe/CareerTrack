export interface Blog {
    articles: Article[];
}

export interface ArticleComment {
    date?: Date;
    person?: string;
    body?: string;
    articleId?: string;
}

export interface ArticleRates {
    likes?: number;
    dislikes?: number;
    articleId: string;
}

export interface Article{
    title?: string;
    blogPicture?: File;
    body?: string;
    comments?: ArticleComment[];
    likes?: number;
    dislikes?: number;
    datePosted?: string;
    blogger?: string;
    articleLink?: string;
    articleId: string;
}
