const handleManager = require('../modules/handleManager');

const getUnfollowList = () => {

  const youFollow = handleManager.filterHandles(handleObj => handleObj.youfollowthem);
  const excludingFollowbacks = youFollow.filter(handleObj => !handleObj.followsyou);

  console.log('of ... ', youFollow.length, ' people you follow, ', youFollow.length - excludingFollowbacks.length, ' follow you');

  const inDescOrder = excludingFollowbacks.map(handleObj => ({
    ...handleObj,
    youfollowedthemon: new Date(handleObj.youfollowedthemon)
  })).sort((a, b) => a.youfollowedthemon - b.youfollowedthemon);

  // console.log(inDescOrder);
  return inDescOrder;

};

module.exports = getUnfollowList;
