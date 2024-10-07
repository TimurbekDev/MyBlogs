import { User , Article , ArticleController , ArticleService } from '@modules'

describe('ArticleController', () => {
  let articleController: ArticleController;
  let articleService: ArticleService;

  beforeEach(() => {
    articleService = new ArticleService(Article, User);
    articleController = new ArticleController(articleService);
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const result: Article[] = [{
        id: 1,
        title: 'bhdbkbker',
        description: 'description',
        user_id: 1,
        image: 'dsjjdcjr',
      } as Article];

      jest.spyOn(articleService, 'findAll').mockImplementation(() => Promise.resolve(result));

      console.log(await articleController.getAllArticles());
      
      await expect(articleController.getAllArticles()).resolves.toBe(result);
    });
  });
});
