import { Router } from "express";
import {
  postShortUrl,
  getUrlId,
  getOpenUrl,
  deleteUrl,
} from "./../controllers/urlController.js";
import {
  urlExists,
  ValidateUrlBelongsToUser,
  ValidateShortUrl,
  ValidateUrlEntrance,
} from "./../middlewares/urlMiddleware.js";
import { ValidateSession } from "../middlewares/sessionMiddleware.js";
const urlRouter = Router();

urlRouter.post(
    "/urls/shorten",ValidateUrlEntrance,
    postShortUrl
  );
  
  urlRouter.get("/urls/:id", urlExists, getUrlId);
  
  urlRouter.get("/urls/open/:shortUrl",ValidateShortUrl, getOpenUrl);
  
  urlRouter.delete("/urls/:id", ValidateSession , urlExists, deleteUrl);

export default urlRouter;
