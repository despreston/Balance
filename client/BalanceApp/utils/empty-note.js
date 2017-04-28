export default function emptyNote (project, type) {
  return {
    _new: true,
    user: project.owner[0].userId,
    project: project._id,
    content: '',
    type
  };
}