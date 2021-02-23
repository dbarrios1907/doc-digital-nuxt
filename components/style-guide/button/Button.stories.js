export default {
  title: 'Style Guide/Button',
  argTypes: {
    label: { control: { type: 'text' } },
    color: { control: { type: 'select', options: ['primary', 'secondary', 'neutral'] } },
    size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <v-container fluid>
      <h3>Primary</h3>
      <v-row>
        <v-col>
          <dx-button color="primary" small v-bind="$props">
            <logo-clave-unica-icon color="light" pr="5"/>
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="primary" v-bind="$props">
            <logo-clave-unica-icon color="light"  pr="5" />
            <span class="underline-text">{{label}}</span> 
          </dx-button>
          <dx-button color="primary" outlined v-bind="$props">
            <logo-clave-unica-icon color="primary"  pr="5" />
            <span class="underline-text">{{label}}</span>
            <dx-icon right chevron regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
          <dx-button large color="primary" v-bind="$props">
            <logo-clave-unica-icon color="light" width="24" height="28" pr="8" />
            <span class="underline-text">{{label}}</span>
            <dx-icon right chevron regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
          <dx-button color="primary" rounded v-bind="$props">
            <logo-clave-unica-icon color="light"  pr="5" />
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="primary" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="primary" disabled v-bind="$props"> <span class="underline-text">{{label}}</span></dx-button>
          <dx-button color="primary" text v-bind="$props">
            <span class="underline-text">{{label}}</span>
          </dx-button>
        </v-col>
      </v-row>
      
      <h3>Secondary</h3>
      <v-row>
        <v-col>
          <dx-button class="primary--text" color="secondary" v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button class="primary--text" color="secondary"  rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button class="primary--text" color="secondary" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button class="primary--text" color="secondary" disabled v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
        </v-col>
      </v-row>

      <h3>Neutral</h3>
      <v-row>
        <v-col>
          <dx-button color="neutral"  v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="neutral"  rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="neutral"  fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="neutral"  disabled v-bind="$props"> <span class="underline-text">{{label}}</span></dx-button>
        </v-col>
      </v-row>
      
      <h3>Success</h3>
      <v-row>
        <v-col>
          <dx-button color="success" v-bind="$props"> <span class="underline-text">{{label}}</span></dx-button>
          <dx-button color="success" rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="success" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="success" disabled v-bind="$props"> <span class="underline-text">{{label}}</span></dx-button>
          <dx-button color="success" text v-bind="$props">
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="success" outlined v-bind="$props">
            <span class="text-underline"> <span class="underline-text">{{label}}</span></span>
            <dx-icon right regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
        </v-col>
      </v-row>
      
      <h3>Error</h3>
      <v-row>
        <v-col>
          <dx-button color="error" v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="error" rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="error" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="error" disabled v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="error" text v-bind="$props">
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="error" outlined v-bind="$props">
            <span class="text-underline"> <span class="underline-text">{{label}}</span></span>
            <dx-icon right regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
        </v-col>
      </v-row>
      
      <h3 class="m-3">Warning</h3>
      <v-row>
        <v-col>
          <dx-button color="warning" v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="warning" rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            {{label}}
          </dx-button>
          <dx-button color="warning" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="warning"  disabled v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="warning" text v-bind="$props">
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="warning" outlined v-bind="$props">
            <span class="text-underline"><span class="underline-text">{{label}}</span></span>
            <dx-icon right regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
        </v-col>
      </v-row>

      <h3 class="m-3">Dark</h3>
      <v-row>
        <v-col>
          <dx-button color="dark" v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="dark" rounded v-bind="$props">
            <dx-icon left>
              mdi-pencil
            </dx-icon>
            {{label}}
          </dx-button>
          <dx-button color="dark" fab v-bind="$props">
            <dx-icon dark>
              mdi-pencil
            </dx-icon>
          </dx-button>
          <dx-button color="dark" disabled v-bind="$props"> <span class="underline-text">{{label}}</span> </dx-button>
          <dx-button color="dark" text v-bind="$props">
            <span class="underline-text">{{label}}</span>
          </dx-button>
          <dx-button color="dark" outlined v-bind="$props">
            <span class="text-underline"> <span class="underline-text">{{label}}</span></span>
            <dx-icon right regular>
              mdi-chevron-down
            </dx-icon>
          </dx-button>
        </v-col>
      </v-row>
    </v-container>
  `,
})

export const Primary = Template.bind({})
Primary.args = {
  color: 'primary',
  label: 'Type something',
}
