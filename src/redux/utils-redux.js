/* eslint-disable no-console */
import reduceReducers from 'reduce-reducers';

/**
 * 提取 redux 目录的二级目录下的单文件中的 actions/reducers/sagas
 * require.context 不支持变量形式的字符串，故该文件目录层级不可移动
 * @returns {
 *  {
 *    key1: { actions: [f, ...],, reducers: [f, ...], sagas: [f, ...],initialState: {} }
 *    key2: { actions: [f, ...],, reducers: [f, ...], sagas: [f, ...],initialState: {} }
 *    ...
 *  }
 * }
 */
const extractReduxFuns = (() => {
  let result = null;
  return () => {
    // 多次调用使用第一次调用时缓存的结果
    if (result) return result;
    const redux = {};

    const files = require.context(__dirname, true, /\.js$/);
    files.keys().forEach(key => {
      // key: ./example/addCount.js   =>   simplifiedKey: example/addCount
      const simplifiedKeyStr = key.replace(/(\.\/|\.js)/g, '');
      const simplifiedKeyArr = simplifiedKeyStr.split('/');
      // 过滤 directory 一级目录下的文件
      if (simplifiedKeyArr.length > 1) {
        simplifiedKeyArr.splice(simplifiedKeyArr.length - 1, 1);
        const dirName = simplifiedKeyArr.join('/');
        const { actions = {}, reducers = [], sagas = [], initialState = {} } = redux[dirName] || {};
        redux[dirName] = {
          actions,
          reducers,
          sagas,
          initialState,
        };
        const exportedObj = files(key); // 文件导出的所有对象
        Object.keys(exportedObj).forEach(exportedKey => {
          // 提取 actions
          if (/.+Action$/.test(exportedKey)) {
            const actionCreator = exportedObj[exportedKey];
            redux[dirName].actions[exportedKey] = actionCreator;
          }
          // 提取 reducers
          if (/.+Reducer/.test(exportedKey)) {
            const reducer = exportedObj[exportedKey];
            redux[dirName].reducers.push(reducer);
          }
          // 提取 initialState
          if (/initialState/.test(exportedKey)) {
            redux[dirName].initialState = exportedObj[exportedKey];
          }
          // 提取 sagas
          if (/.+Watcher$/.test(exportedKey)) {
            const saga = exportedObj[exportedKey];
            redux[dirName].sagas.push(saga);
          }
        });
      }
    });
    result = redux;
    return result;
  };
})();

/**
 *  获取能用于 combineReducers 的 reducers 对象
 */
const getReducers = () => {
  const result = {};
  const redux = extractReduxFuns();
  Object.keys(redux).forEach(key => {
    const { reducers = [], initialState = {} } = redux[key];
    result[key] = reduceReducers(initialState, ...reducers);
  });
  return result;
};

/**
 * 获取 actions 数组
 * @param {*} dir 不传参时获取全部 actions, 传参时获取对应目录下 actions
 */
const getActions = dir => {
  let result = {};
  const redux = extractReduxFuns();

  if (dir && redux[dir]) {
    return redux[dir].actions ?? [];
  }
  Object.keys(redux).forEach(key => {
    const { actions = {} } = redux[key];
    result = { ...result, ...actions };
  });
  return result;
};
/**
 * 获取 sagas 数组
 * @param {*} dir 不传参时获取全部 sagas, 传参时获取对应目录下 sagas
 */
const getSagas = dir => {
  let result = [];
  const redux = extractReduxFuns();

  if (dir && redux[dir]) {
    return redux[dir].actions ?? [];
  }
  Object.keys(redux).forEach(key => {
    const { sagas = [] } = redux[key];
    result = [...result, ...sagas];
  });
  return result;
};

export { getReducers, getActions, getSagas };
