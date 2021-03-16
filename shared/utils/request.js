import Toast from '~/components/style-guide/alerts/ToastService'

export const isValidResponse = resp => [resp?.status === 200, Toast]

export const isUserErrorResponse = resp => resp?.status === 404 || resp?.status === 401 || resp?.status === 403
