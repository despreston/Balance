import dev from '../config/development';
import defaults from '../config/default';

global.CONFIG = Object.assign({}, defaults, dev);