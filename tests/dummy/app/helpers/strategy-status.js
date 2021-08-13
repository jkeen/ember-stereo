import { helper } from '@ember/component/helper';

function color(item, loadWasAttempted) {
  if (loadWasAttempted) {
    if (item.success) {
      return "green-500"
    } else if (item.canPlay && !item.tried) {
      return "gray-800"
    } else if (item.canPlay && item.tried) {
      return "red"
    } else if (!item.canPlay) {
      return "gray-800"
    }
  } else {
    if (item.canPlay) {
      return "gray-800"
    } else if (!item.canPlay) {
      return "gray-800"
    }
  }
}

function status(item, loadWasAttempted = false) {
  if (loadWasAttempted) {
    if (item.success) {
      return "success"
    } else if (item.canPlay && !item.tried) {
      return "eligible"
    } else if (item.canPlay && item.tried) {
      return "failure"
    } else { //} if (!item.canPlay) {
      return "ineligible"
    }
  } else {
    if (item.canPlay) {
      return "eligible"
    } else {
      return "ineligible"
    }
  }
}

function message(item, loadWasAttempted) {
  if (loadWasAttempted) {
    if (item.success) {
      return "succeeded"
    } else if (item.canPlay && !item.tried) {
      return "was not attempted"
    } else if (item.canPlay && item.tried) {
      return (item.error || "attempted and failed")
    } else if (!item.canPlay) {
      return "ineligible, not attempted"
    }
  } else {
    if (item.canPlay) {
      return "is eligible, will attempt"
    } else if (!item.canPlay) {
      return "is ineligible, will not attempt"
    }
  }
}

export default helper(function strategyStatus(params, hash) {
  let [item] = params;
  let { loadWasAttempted, userSelected } = hash

  return {
    color: color(item, loadWasAttempted),
    status: status(item, loadWasAttempted, userSelected),
    message: message(item, loadWasAttempted, userSelected),
  }
});
