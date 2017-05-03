/**
 * Privacy level
 */
module.export = {

    required: true,
    type: String,
    index: true,
    default: 'global',
    enum: ['global', 'friends', 'private']
    
};