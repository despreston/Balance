export default function emptyProject (userId) {
  return {
    _new: true,
    title: '',
    user: userId,
    privacyLevel: 'global'
  };
};