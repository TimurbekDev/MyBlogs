import { User , Article , ArticleController , ArticleService } from '@modules'

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(() => {
    articleService = new ArticleService(Article, User);
    articleController = new ArticleController(articleService);
  });

  describe('findAll', () => {
    it('should return a Promise of an array of articles', async () => {
      const result: Article[] = [{
        id: 1,
        title: 'Test Article',
        description: 'Test content',
        user_id: 1,
        image: 'test-image.jpg',
      } as Article];

      jest.spyOn(articleService, 'findAll').mockImplementation(() => Promise.resolve(result));

      await expect(articleController.getAllArticles()).resolves.toBe(result);
    });
  });
});
