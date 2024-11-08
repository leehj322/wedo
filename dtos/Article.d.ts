declare module "Type/Article" {
  type defaultArticle = {
    id: number;
    writer: {
      id: number;
      nickname: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };

  type Image = {
    image?: string | File | null;
  };

  type OrderBy = "recent" | "like";

  type Query = {
    page: string;
    pageSize: string;
    orderBy: OrderBy;
    keyword?: string;
  };

  type Article = defaultArticle & {
    title: string;
    likeCount: number;
  } & Image;

  type Articles = {
    list: Article[];
    totalCount: number;
    query: Query;
  };

  type ArticleDetail = Article & {
    content: string;
    commentCount: number;
    isLiked: boolean;
  };

  type Comment = defaultArticle & {
    content: string;
    writer: Image;
  };

  type Comments = {
    list: Comment[];
    nextCursor: number | null;
  };

  type Delete = {
    id: number;
  };

  type ArticleContent = {
    title?: string;
    content: string;
  } & Image;
}
