import fetch from 'node-fetch'
import { schedule } from '@netlify/functions'


const BUILD_HOOK = 'https://api.netlify.com/build_hooks/67e568c15efcdb48ef599b04'

// Schedules the handler function to run “At 00:00.” (2h du matin en france)
const handler = schedule('0 0 * * *', async () => {
    await fetch(BUILD_HOOK, {
      method: 'POST'
    }).then(response => {
      console.log('Build hook response:', response)
    })
  

  return {
    statusCode: 200
  }
})

export {
  handler
}