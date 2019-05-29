import { success, notFound } from '../../services/response/'
import { Notebook } from '.'

export const showById = ({ params }, res, next) => 
    Notebook.findById(params.id)
        .then(notFound(res))
        .then((notebook) => notebook ? notebook.view() : null)
        .then(success(res))
        .catch(next)

export const showAll = ({ querymen: { query, select, cursor } }, res, next) => 
    Notebook.find({ user: res.req.user._id }, select, cursor)
    .then((notebooks) => notebooks.map((notebook) => notebook.view()))
    .then(success(res))
    .catch(next)

export const create = ({ bodymen: { body } }, res, next) => 
    Notebook.create({ ...body, user: res.req.user._id})
    .then((notebook) => notebook.view(true))
    .then(success(res, 201))
    .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).json({
                valid: false,
                param: 'title',
                message: 'title already registered'
            })
        } else {
            next(err)
        }
    })

export const removeById = ({ params }, res, next) => 
    Notebook.findById(params.id)
        .then(notFound(res))
        .then((notebook) => notebook ? notebook.remove() : null)
        .then(success(res, 204))
        .catch(next)

export const update = ({ bodymen: { body }, params}, res, next) => 
    Notebook.findById(params.id)
        .then(notFound(res))
        .then((notebook) => 
            notebook ? 
            notebook.set({title: body.title, description: body.description, 
                pages: body.pages, number_of_pages: body.number_of_pages}).save()
            : null)
        .then(success(res))
        .catch(next)



    