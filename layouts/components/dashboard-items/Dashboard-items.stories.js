import Dashboard from './Dashboard'

export default {
  title: 'Layouts',
  argTypes: {},
}

export const Demo = () => ({
  components: {
    Dashboard,
  },
  data: () => ({
    itemClasses: 'px-10 primary--text col-md-4',
  }),
  //html
  template: `
    <div>
      <v-container> 
        <Dashboard />
      </v-container>
    </div>
  `,
})
