export default function emptyNote (project, type) {
  return {
    _new: true,
    user: project.user,
    project: project._id,
    content: '',
    type
  };
};