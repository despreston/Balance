import user         from './user';
import project      from './project';
import note         from './note';
import comment      from './comment';
import reaction     from './reaction';
import notification from './notification';
import shared       from './shared';
import device       from './device';
import bookmark     from './bookmark';

export default Object.assign({},
  user,
  project,
  note,
  comment,
  reaction,
  notification,
  shared,
  device,
  bookmark
);