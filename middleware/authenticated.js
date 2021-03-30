export default async function ({ store, redirect }) {
  if (!store.getters.userId) redirect('/401')
}
