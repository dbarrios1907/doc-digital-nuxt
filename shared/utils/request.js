import Toast from '~/components/style-guide/alerts/ToastService'

export const isValidResponse = resp => [resp?.status === 200, Toast]

export const isAuthErrorResponse = resp => resp?.status === 401 || resp?.status === 403

export const NotFoundError = resp => resp?.status === 404
