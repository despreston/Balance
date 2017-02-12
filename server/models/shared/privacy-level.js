/**
 * Privacy level
 */
module.export = {
    required: true,
    type: String,
    default: 'global',
    enum: ['global', 'friends', 'private']
};