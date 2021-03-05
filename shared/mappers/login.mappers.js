import { isVStatus } from './utils.mappers'
import get from 'lodash.get'

export const mapLoginUrl = resp => (isVStatus(resp) && get(resp, 'result.url', '/404')) || '/404'
