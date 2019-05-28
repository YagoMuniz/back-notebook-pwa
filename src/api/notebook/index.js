import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { showById, showAll, create, update, removeById} from './controller'
import { schema } from './model'

export Notebook, { schema } from './model'

const router = new Router()
const { title, description, pages, number_of_pages } = schema.tree

router.get('/', token({required: false, roles:['user, admin']}), query(), showAll)
router.get('/:id', token({required: true, roles:['user', 'admin']}), showById)
router.post('/', token({required: true, roles:['user', 'admin']}), body({ title, description, pages, number_of_pages }), create)
router.delete('/:id', token({required: true, roles:['user', 'admin']}), removeById)
router.put('/:id', token({required: true}), body({ title, description, pages, number_of_pages }), update)

export default router

