import Toast from '~/components/style-guide/alerts/ToastService'
import get from 'lodash.get'

export const isValidResponse = resp => [resp?.status === 200, Toast]

export const getErrorResponse = err => get(err, `response.data`, null)

export const isAuthErrorResponse = resp => resp?.status === 401 || resp?.status === 403

export const tokenExpiredError = resp => resp?.status === 403

export const NotFoundError = resp => resp?.status === 404
