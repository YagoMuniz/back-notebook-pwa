import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { showById, showAll, create, update, removeById} from './controller'
import { schema } from './model'

export Notebook, { schema } from './model'

const router = new Router()
const { name, title, description, pages, number_of_pages } = schema.tree

router.get('/', token({required: true}), query(), showAll)
router.get('/:id', token({required: true}), showById)
router.post('/', token({required: true}), body({ name, title, description, pages, number_of_pages }), create)
router.delete('/:id', token({required: true}), removeById)
router.put('/:id', token({required: true}), body({ name, title, description, pages, number_of_pages }), update)

export default router

