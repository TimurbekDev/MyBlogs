import { Test } from "@nestjs/testing";
import { ArticleService } from "./article.service";
import { Article } from "./models";
import { getModelToken } from "@nestjs/sequelize";

describe("ArticleService", () => {
  let articleService: ArticleService;
  let mockArticleModel: jest.Mocked<typeof Article>;

  beforeEach(async () => {
    // Create a fully mocked model using jest.Mocked
    mockArticleModel = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: "title1",
          description: "wjdjuwd",
          image: null,
          user_id: 2,
        },
      ]),
      // Add more mock methods as needed by ArticleService
    } as unknown as jest.Mocked<typeof Article>;

    const module = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article),
          useValue: mockArticleModel,
        },
      ],
    }).compile();

    articleService = module.get<ArticleService>(ArticleService);
  });

  it("should return all articles", async () => {
    const articles = await articleService.findAll();
    expect(articles).toEqual([
      {
        id: 1,
        title: "title1",
        description: "wjdjuwd",
        image: null,
        user_id: 2,
      },
    ]);
    expect(mockArticleModel.findAll).toHaveBeenCalledTimes(1);
  });
});
