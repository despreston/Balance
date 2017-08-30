export default function emptyProject (userId) {
  return {
    _new: true,
    title: '',
    user: userId,
    privacyLevel: 'global',
    category: 'Other',
    status: 'active'
  };
}
