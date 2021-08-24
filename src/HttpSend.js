/**
 * @param {'GET' | 'POST'} method
 * @param {String} path
 * @param {Any} [data]
 */
export async function send (method, path, data) {
  if (isOnDev()) path = `${window.location.origin.replace(/:5000$/, ':3000')}${path}`

  const res = await window.fetch(path, {
    headers: {
      'content-type': 'application/json'
    },
    method,
    body: data !== undefined ? JSON.stringify(data) : undefined
  })

  return await res.json()
}

function isOnDev () {
  return /:5000$/.test(window.location.host)
}
