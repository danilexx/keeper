'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Item = use('App/Models/Item')
const Database = use('Database')
/**
 * Resourceful controller for interacting with items
 */
class ItemController {
  /**
   * Show a list of all items.
   * GET items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { adventure_id } = request
    const items = await Item.query().where('adventure_id', adventure_id).with('skills.icon').with('icon').fetch()
    return items
  }

  /**
   * Create/save a new item.
   * POST items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { master, adventure_id } = request
    const { skills, ...data } = request.only([
      'name',
      'description',
      'type',
      'main_attribute',
      'main_attribute_value',
      'secondary_attribute',
      'secondary_attribute_value',
      'skills',
      'icon_id'
    ])
    const item = await Item.create({ ...data, master_id: master.id, adventure_id })
    if (skills) {
      await item.skills().attach(skills)
    }
    return item
  }

  /**
   * Display a single item.
   * GET items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    const item = await Item.find(params.id)
    if (!item) {
      return response.status(404).send({
      })
    }
    await item.load('user')
    return item
  }

  /**
   * Render a form to update an existing item.
   * GET items/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update ({ params, request, response }) {
    const trx = await Database.beginTransaction()
    const { skills, ...data } = request.only([
      'name',
      'description',
      'type',
      'main_attribute',
      'main_attribute_value',
      'secondary_attribute',
      'secondary_attribute_value',
      'skills',
      'icon_id'

    ])
    const item = await Item.find(params.id)
    item.merge(data, trx)
    if (skills) {
      await item.skills().sync(skills, trx)
    }
    await item.save(trx)
    await item.load('skills')
    await trx.commit()
    return item
  }

  /**
   * Delete a item with id.
   * DELETE items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const item = await Item.findOrFail(params.id)
    await item.delete()
    return {
      ok: 'item delete with sucess'
    }
  }
}

module.exports = ItemController
