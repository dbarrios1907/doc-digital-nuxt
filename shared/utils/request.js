import Toast from '~/components/style-guide/alerts/ToastService'

export const isValidResponse = resp => [resp?.status === 200, Toast]
