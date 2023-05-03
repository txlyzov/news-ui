import { makeAutoObservable } from "mobx";

class NewsStore {
  newsList = undefined;

  lastUpdateTime = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setNewsList(list) {
    this.newsList = list;
  }

  setLastUpdateTime(newTime) {
    this.lastUpdateTime = newTime;
  }
}

export default new NewsStore();
