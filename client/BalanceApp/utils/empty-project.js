export default function emptyProject () {
  return {
    _new: true,
    title: '',
    user: CONFIG.userId,
    privacyLevel: 'global'
  };
};