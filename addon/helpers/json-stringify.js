import { helper } from '@ember/component/helper';

export default helper(function jsonStringify(params/*, hash*/) {
  if (!params || !params[0] || params[0] == undefined) {
    return "";
  }

  if (params[1]) {
    return JSON.stringify(params[0], null, 2);
  } else {
    return JSON.stringify(params[0]);
  }
});
