import mitt from 'mitt'

const emitter = mitt()

const SUPER_COMP_EVENT = 'EVENT-FROM-COMPONENT'

export { emitter, SUPER_COMP_EVENT }
