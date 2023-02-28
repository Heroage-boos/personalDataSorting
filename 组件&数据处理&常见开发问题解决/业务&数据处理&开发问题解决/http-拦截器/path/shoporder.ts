import { Get } from "../server";

function getShoporderDetail() {
  return Get("/api/users/");
}

function getShoporderList() {
  return Get("/api/users/");
}

export const shoporderApi = {
  getShoporderDetail,
  getShoporderList,
};
