import { makeAutoObservable } from "mobx";

class CurrentItemStore {
  currentItem = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentItem(item) {
    this.currentItem = item;
  }
}

export default new CurrentItemStore();
