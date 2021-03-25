import Toast from '~/components/style-guide/alerts/ToastService'
import get from 'lodash.get'

export const isValidResponse = resp => [resp?.status === 200, Toast]

export const getErrorResponse = err => [get(err, `response.data`, null), Toast]

export const isAuthErrorResponse = resp => resp?.status === 401 || resp?.status === 403

export const tokenExpiredError = resp => resp?.erroCode === 40301

export const isUserAwareError = resp => [40101, 40102, 40103, 40104, 40105, 40107, 40108, 40301, 40303].includes(resp?.errorCode)

export const NotFoundError = resp => resp?.status === 404
