import {createRoot} from 'react-dom/client'
import App from './App'
import './output.css'

const Container = document.getElementById('root')
const Root = createRoot(Container)
Root.render(<App/>)