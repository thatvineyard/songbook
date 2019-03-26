import { Router, Request, Response } from "express";

class songsRoute {
  
  getSongs(req: Request, res: Response): void {
    res.send('hello');
  }

  public registerRoutes(router: Router, baseUrl: String): void {
    router.get(baseUrl + '/songs', this.getSongs);
  }
}

export default songsRoute;