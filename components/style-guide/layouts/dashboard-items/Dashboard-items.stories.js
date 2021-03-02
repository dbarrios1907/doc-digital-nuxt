import Dashboard from './Dashboard'

export default {
  title: 'Layouts',
  argTypes: {},
}

export const Default = () => ({
  components: {
    Dashboard,
  },
  data: () => ({
    itemClasses: 'px-10 primary--text col-md-4',
  }),
  //html
  template: `
    <div class="px-5">
        <Dashboard />
    </div>
  `,
})
