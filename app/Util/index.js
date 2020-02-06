const inventorySync = async (inventory, character) => {
  if (inventory) {
    let items
    if (typeof inventory[0] === 'object') {
      items = inventory.map(({ id }) => id)
    } else {
      items = inventory
    }
    await character.inventory().sync(items, (row) => {
      const findId = e => e.id === row.item_id
      const item = inventory.find(findId) || { quantity: 1 }
      const quantity = item.quantity
      row.quantity = quantity
    })
  }
}
const adventureAuth = require('./adventureAuth')
module.exports = { inventorySync, adventureAuth }
