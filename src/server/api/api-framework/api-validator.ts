import { ApiBuilder } from "./api-builder";

// Add method validator middleware
export function registerApiValidator(
  apiBuilder: ApiBuilder,
  router: Router
): void {
  router.use((req: Request, res: Response, next: NextFunction) => {
    res = apiBuilder.validate(req, res, apiBuilder.methods);
    if (res.statusCode / 100 === 2) {
      next();
    } else {
      res.send();
    }
  });
}
