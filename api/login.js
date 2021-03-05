import { mapLoginUrl } from '~/shared/mappers/login.mappers'

export const fetchLoginUrl = async fetch => {
  const resp = await fetch('https://api-docv3.test.digital.gob.cl/auth/url').then(res => res.json())
  return mapLoginUrl(resp)
}
