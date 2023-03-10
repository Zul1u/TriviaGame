// https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function setLocalStorage(id, data) {
  window.localStorage.setItem(id, JSON.stringify(data));
}

function getItemLocalStorage(mockId) {
  const storage = localStorage.getItem(mockId);
  if (storage) return JSON.parse(storage);
  return null;
}

function deleteLocalStorage(mockId) {
  return localStorage.removeItem(mockId);
}

const defaultQuestionReportValue = {
  questionNumber: 1,
  hitNumber: 0,
};

const questionReportFinalValue = {
  questionNumber: 2,
  hitNumber: 2,
};

export {
  setLocalStorage,
  getItemLocalStorage,
  deleteLocalStorage,
  defaultQuestionReportValue,
  questionReportFinalValue,
};
