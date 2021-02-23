import Badge from './Badge.vue'

export default {
  title: 'Style Guide/Badge',
  component: Badge,
  argTypes: {},
}

export const Demo = () => ({
  components: { Badge },
  template: `
    <div>
      <h3>Ejemplo de insginias en notificaciones</h3>
      <div>
        <Badge type="notification" label>            
            <div class="badge-text">Type something</div>
            <div class="badge-number">1</div>
        </Badge>
        <Badge type="notification" label small>            
            <div class="badge-text">Type something</div>
            <div class="badge-number">1</div>
        </Badge>        
        <Badge type="notification" label x-small>            
            <div class="badge-text">Type something</div>
            <div class="badge-number">1</div>
        </Badge>
      </div>
      <h3>Variaciones de color de insignia</h3>
      <div>
        <Badge type="primary" label>
          primary
        </Badge>
  
        <Badge type="secondary" label>
          secondary
        </Badge>
  
        <Badge type="tertiary" label outlined>
          tertiary
        </Badge>
  
        <Badge type="success" label>
          success
        </Badge>
  
        <Badge label type="error">
          error
        </Badge>
  
        <Badge label type="warning">
          warning
        </Badge>
  
        <Badge label type="info">
          info
        </Badge>
  
        <Badge label>
          Light
        </Badge>
  
        <Badge type="dark" label>
          Dark
        </Badge>
      </div>
      <div>
        <Badge type="primary" label small>
          primary
        </Badge>
  
        <Badge type="secondary" label small>
          secondary
        </Badge>
  
        <Badge type="tertiary" label outlined small>
          tertiary
        </Badge>
  
        <Badge type="success" label small>
          success
        </Badge>
  
        <Badge label type="error" small>
          error
        </Badge>
  
        <Badge label type="warning" small>
          warning
        </Badge>
  
        <Badge label type="info" small>
          info
        </Badge>
  
        <Badge label small>
          Light
        </Badge>
  
        <Badge type="dark" label small>
          Dark
        </Badge>
      </div>
      <div>
        <Badge type="primary" label x-small>
          primary
        </Badge>
  
        <Badge type="secondary" label x-small>
          secondary
        </Badge>
  
        <Badge type="tertiary" label outlined x-small>
          tertiary
        </Badge>
  
        <Badge type="success" label x-small>
          success
        </Badge>
  
        <Badge label type="error" x-small>
          error
        </Badge>
  
        <Badge label type="warning" x-small>
          warning
        </Badge>
  
        <Badge label type="info" x-small>
          info
        </Badge>
  
        <Badge label x-small>
          Light
        </Badge>
  
        <Badge type="dark" label x-small>
          Dark
        </Badge>
      </div>
    
      <h3>Insignias curvas</h3>
      <div>
        <Badge type="primary" small>
          primary
        </Badge>

        <Badge type="secondary"small>
          secondary
        </Badge>

        <Badge type="tertiary"outlined small>
          tertiary
        </Badge>

        <Badge type="success"small>
          success
        </Badge>

        <Badge type="error" small>
          error
        </Badge>

        <Badge type="warning" small>
          warning
        </Badge>

        <Badge type="info" small>
          info
        </Badge>

        <Badge small>
          Light
        </Badge>

        <Badge type="dark" small>
          Dark
        </Badge>
      </div>
    
    <h3>Links con insignia</h3>
      <div>
        <Badge type="primary" label small link>
          primary
        </Badge>

        <Badge type="secondary" label small link>
          secondary
        </Badge>

        <Badge type="tertiary" label outlined small link>
          tertiary
        </Badge>

        <Badge type="success" label small link>
          success
        </Badge>

        <Badge label type="error" small link>
          error
        </Badge>

        <Badge label type="warning" small link>
          warning
        </Badge>

        <Badge label type="info" small link>
          info
        </Badge>

        <Badge label small link>
          Light
        </Badge>

        <Badge type="dark" label small link>
          Dark
        </Badge>
      </div>
    </div>
  `,
})
